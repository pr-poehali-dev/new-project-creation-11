import base64
import json
import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText
from typing import Any, Dict
from urllib.error import HTTPError
from urllib.request import Request, urlopen

import psycopg2

YOOKASSA_API_URL = "https://api.yookassa.ru/v3/payments"
NOTIFY_EMAIL = "inka_f@mail.ru"


def get_schema() -> str:
    """Get database schema prefix."""
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    return f"{schema}." if schema else ""


def verify_payment_via_api(payment_id: str, shop_id: str, secret_key: str) -> Dict[str, Any] | None:
    """Verify actual payment status directly in YooKassa (source of truth)."""
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
        with urlopen(request, timeout=3) as response:
            return json.loads(response.read().decode())
    except (HTTPError, Exception):
        return None


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

        with smtplib.SMTP_SSL(host, int(port), timeout=15) as server:
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
            urlopen(request, timeout=10)
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


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Возвращает статус заказа ЮKassa по номеру заказа (order_number).
    Используется страницей /order-status для отображения результата оплаты.

    Если заказ ещё числится как 'pending', функция дополнительно сверяет
    актуальный статус напрямую в ЮKassa (на случай, если вебхук от ЮKassa
    не дошёл) и обновляет заказ в базе, если оплата на самом деле прошла.
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    params = event.get('queryStringParameters') or {}
    order_number = (params.get('order_number') or '').strip()

    if not order_number:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'order_number is required'}),
        }

    S = get_schema()
    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        order_number_esc = order_number.replace("'", "''")
        cur.execute(f"""
            SELECT id, order_number, tariff_id, tariff_title, status, amount,
                   user_name, user_email, created_at, paid_at, yookassa_payment_id
            FROM {S}orders
            WHERE order_number = '{order_number_esc}'
        """)
        row = cur.fetchone()

        if not row:
            return {
                'statusCode': 404,
                'headers': headers,
                'body': json.dumps({'error': 'Order not found'}),
            }

        (order_id, order_number, tariff_id, tariff_title, status, amount,
         user_name, user_email, created_at, paid_at, payment_id) = row

        # Sync with YooKassa if still pending and we can verify it
        if status == 'pending' and payment_id:
            shop_id = os.environ.get('YOOKASSA_SHOP_ID', '')
            secret_key = os.environ.get('YOOKASSA_SECRET_KEY', '')
            if shop_id and secret_key:
                verified = verify_payment_via_api(payment_id, shop_id, secret_key)
                if verified:
                    real_status = verified.get('status', '')
                    now = datetime.utcnow().isoformat()

                    if real_status == 'succeeded':
                        cur.execute(f"""
                            UPDATE {S}orders
                            SET status = 'paid', paid_at = %s, updated_at = %s
                            WHERE id = %s
                        """, (now, now, order_id))
                        conn.commit()
                        status = 'paid'
                        paid_at = now
                        notify_order_paid(
                            order_number,
                            tariff_title or 'Оплата',
                            float(amount) if amount is not None else 0,
                            user_name or user_email
                        )
                    elif real_status == 'canceled':
                        cur.execute(f"""
                            UPDATE {S}orders
                            SET status = 'canceled', updated_at = %s
                            WHERE id = %s
                        """, (now, order_id))
                        conn.commit()
                        status = 'canceled'

        cur.close()
    finally:
        conn.close()

    result = {
        'order_number': order_number,
        'tariff_id': tariff_id,
        'status': status,
        'amount': float(amount) if amount is not None else None,
        'user_name': user_name,
        'user_email': user_email,
        'created_at': created_at.isoformat() if created_at else None,
        'paid_at': paid_at.isoformat() if isinstance(paid_at, datetime) else paid_at,
    }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result),
    }