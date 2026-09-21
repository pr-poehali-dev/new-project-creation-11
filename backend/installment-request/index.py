import json
import os
import re
import smtplib
from email.mime.text import MIMEText
from urllib.request import Request, urlopen
from typing import Dict, Any

import psycopg2

EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}

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


def notify_installment_request(tariff_title: str, user_name: str) -> None:
    """Notify about a new installment (payment-by-parts) request."""
    text = (
        f"📋 Новая заявка на рассрочку\n"
        f"Формат сотрудничества: {tariff_title}\n"
        f"Тип заявки: рассрочка\n"
        f"Клиент: {user_name}"
    )
    tg_text = (
        f"📋 <b>Новая заявка на рассрочку</b>\n"
        f"Формат сотрудничества: {tariff_title}\n"
        f"Тип заявки: рассрочка\n"
        f"Клиент: {user_name}"
    )

    send_email_notification(f"Заявка на рассрочку — {tariff_title}", text)
    send_telegram_notification(tg_text)


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Принимает заявку на оплату в рассрочку по тарифу и сохраняет её в БД
    для последующей ручной обработки (отправку менеджеру настраивает пользователь отдельно).
    """
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = event.get('body', '{}') or '{}'
    try:
        data = json.loads(body)
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    tariff_id = (data.get('tariff_id') or '').strip()
    tariff_title = (data.get('tariff_title') or '').strip()
    user_name = (data.get('user_name') or '').strip()
    user_email = (data.get('user_email') or '').strip()
    user_phone = (data.get('user_phone') or '').strip()

    if not tariff_id or not tariff_title:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'tariff_id and tariff_title are required'}),
        }

    if not user_name:
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'user_name is required'}),
        }

    if not user_email or not EMAIL_REGEX.match(user_email):
        return {
            'statusCode': 400,
            'headers': HEADERS,
            'body': json.dumps({'error': 'Valid user_email is required'}),
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO installment_requests
            (tariff_id, tariff_title, user_name, user_email, user_phone)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id
            """,
            (tariff_id, tariff_title, user_name, user_email, user_phone or None),
        )
        request_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
    finally:
        conn.close()

    notify_installment_request(tariff_title, user_name)

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps({'id': request_id, 'status': 'ok'}),
    }