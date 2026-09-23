"""YooKassa webhook handler for payment notifications."""
import json
import os
import base64
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import HTTPError

import psycopg2

from google_sheets import append_row

# =============================================================================
# CONSTANTS
# =============================================================================

HEADERS = {
    'Content-Type': 'application/json'
}

YOOKASSA_API_URL = "https://api.yookassa.ru/v3/payments"


# =============================================================================
# SECURITY
# =============================================================================

def verify_payment_via_api(payment_id: str, shop_id: str, secret_key: str) -> dict | None:
    """Verify payment status via YooKassa API.

    YooKassa doesn't use webhook signatures. The recommended approach is to
    verify payment status by making a GET request to the API.
    """
    auth_string = f"{shop_id}:{secret_key}"
    auth_bytes = base64.b64encode(auth_string.encode()).decode()

    request = Request(
        f"{YOOKASSA_API_URL}/{payment_id}",
        headers={
            'Authorization': f'Basic {auth_bytes}',
            'Content-Type': 'application/json'
        },
        method='GET'
    )

    try:
        with urlopen(request, timeout=10) as response:
            return json.loads(response.read().decode())
    except (HTTPError, Exception):
        return None


# =============================================================================
# DATABASE
# =============================================================================

def get_connection():
    """Get database connection."""
    return psycopg2.connect(os.environ['DATABASE_URL'])


def get_schema() -> str:
    """Get database schema prefix."""
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    return f"{schema}." if schema else ""


# =============================================================================
# NOTIFICATIONS (email + telegram)
# =============================================================================

NOTIFY_EMAIL = "inka_f@mail.ru"


def send_email_notification(subject: str, text: str) -> None:
    """Send a plain-text email notification. Fails silently if not configured."""
    host = os.environ.get('SMTP_HOST', '')
    port = os.environ.get('SMTP_PORT', '')
    user = os.environ.get('SMTP_USER', '')
    password = os.environ.get('SMTP_PASSWORD', '')

    if not (host and port and user and password):
        return

    try:
        msg = MIMEText(text, _charset='utf-8')
        msg['Subject'] = subject
        msg['From'] = user
        msg['To'] = NOTIFY_EMAIL

        with smtplib.SMTP_SSL(host, int(port), timeout=4) as server:
            server.login(user, password)
            server.sendmail(user, [NOTIFY_EMAIL], msg.as_string())
    except Exception:
        pass


def send_telegram_notification(text: str) -> None:
    """Send a message to all configured Telegram chats. Fails silently if not configured."""
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_ids_raw = os.environ.get('TELEGRAM_CHAT_IDS', '')

    if not (bot_token and chat_ids_raw):
        return

    chat_ids = [c.strip() for c in chat_ids_raw.split(',') if c.strip()]

    for chat_id in chat_ids:
        try:
            payload = json.dumps({
                'chat_id': chat_id,
                'text': text,
                'parse_mode': 'HTML'
            }).encode('utf-8')
            request = Request(
                f"https://api.telegram.org/bot{bot_token}/sendMessage",
                data=payload,
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            urlopen(request, timeout=4)
        except Exception:
            pass


def notify_order_paid(order_number: str, tariff_title: str, amount: float, user_name: str) -> None:
    """Notify that a previously pending order has been paid."""
    amount_label = f"{amount:,.0f} ₽".replace(',', ' ')

    text = (
        f"✅ Заявка оплачена\n"
        f"Формат сотрудничества: {tariff_title}\n"
        f"Тип заявки: оплата\n"
        f"Сумма: {amount_label}\n"
        f"Статус: Оплачено ✅\n"
        f"Клиент: {user_name}\n"
        f"Номер заказа: {order_number}"
    )
    tg_text = (
        f"✅ <b>Заявка оплачена</b>\n"
        f"Формат сотрудничества: {tariff_title}\n"
        f"Тип заявки: оплата\n"
        f"Сумма: {amount_label}\n"
        f"Статус: Оплачено ✅\n"
        f"Клиент: {user_name}\n"
        f"Номер заказа: {order_number}"
    )

    send_email_notification(f"Заявка оплачена — {tariff_title}", text)
    send_telegram_notification(tg_text)


# =============================================================================
# HANDLER
# =============================================================================

def handler(event, context):
    """Handle YooKassa webhook notification."""
    if event.get('httpMethod') != 'POST':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'})
        }

    # Parse body
    body = event.get('body', '{}')
    if event.get('isBase64Encoded'):
        body = base64.b64decode(body).decode('utf-8')

    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid JSON'})
        }

    # Extract payment info
    event_type = data.get('event', '')
    payment_object = data.get('object', {})
    payment_id = payment_object.get('id', '')
    metadata = payment_object.get('metadata', {})

    if not payment_id:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Missing payment id'})
        }

    # Security: Verify payment via API (most reliable)
    shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')

    if shop_id and secret_key:
        verified_payment = verify_payment_via_api(payment_id, shop_id, secret_key)
        if not verified_payment:
            return {
                'statusCode': 400,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Payment verification failed'})
            }
        # Use verified status instead of webhook data
        payment_status = verified_payment.get('status', '')
    else:
        # Fallback to webhook data (less secure, only if credentials missing)
        payment_status = payment_object.get('status', '')

    S = get_schema()
    conn = get_connection()

    try:
        cur = conn.cursor()
        now = datetime.utcnow().isoformat()

        # Find order by payment_id
        cur.execute(f"""
            SELECT id, status, order_number, tariff_id, tariff_title, amount,
                   user_name, user_email, user_phone, payment_url, created_at
            FROM {S}orders
            WHERE yookassa_payment_id = %s
        """, (payment_id,))

        row = cur.fetchone()

        if not row:
            # Try to find by order_id from metadata
            order_id_meta = metadata.get('order_id')
            if order_id_meta:
                cur.execute(f"""
                    SELECT id, status, order_number, tariff_id, tariff_title, amount,
                           user_name, user_email, user_phone, payment_url, created_at
                    FROM {S}orders WHERE id = %s
                """, (int(order_id_meta),))
                row = cur.fetchone()

        if not row:
            return {
                'statusCode': 404,
                'headers': HEADERS,
                'body': json.dumps({'error': 'Order not found'})
            }

        (order_id, current_status, order_number, tariff_id, tariff_title, amount,
         user_name, user_email, user_phone, payment_url, created_at) = row

        # Update based on verified payment status
        if payment_status == 'succeeded':
            if current_status != 'paid':
                cur.execute(f"""
                    UPDATE {S}orders
                    SET status = 'paid', paid_at = %s, updated_at = %s
                    WHERE id = %s
                """, (now, now, order_id))
                conn.commit()

                notify_order_paid(
                    order_number,
                    tariff_title or 'Оплата',
                    float(amount),
                    user_name or user_email
                )

                # Column order matches the "orders" table / CSV export layout.
                append_row('Оплаты', [
                    order_id,
                    order_number,
                    tariff_id or '',
                    user_name,
                    user_email,
                    user_phone,
                    float(amount),
                    payment_id,
                    'paid',
                    payment_url,
                    str(created_at),
                    now,
                    now,
                    tariff_title,
                ])

        elif payment_status == 'canceled':
            if current_status not in ('paid', 'canceled'):
                cur.execute(f"""
                    UPDATE {S}orders
                    SET status = 'canceled', updated_at = %s
                    WHERE id = %s
                """, (now, order_id))
                conn.commit()

        return {
            'statusCode': 200,
            'headers': HEADERS,
            'body': json.dumps({'status': 'ok'})
        }

    except Exception as e:
        conn.rollback()
        return {
            'statusCode': 500,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Internal error'})
        }
    finally:
        conn.close()