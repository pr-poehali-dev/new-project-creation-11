import json
import os
import re
import smtplib
import threading
from email.mime.text import MIMEText
from urllib.request import Request, urlopen
from typing import Dict, Any

import psycopg2

from google_sheets import append_row

EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}

NOTIFY_EMAIL = "inka_f@mail.ru"
FORMAT_TITLE = "Бесплатная стартовая встреча"


def send_email_notification(subject: str, text: str) -> None:
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
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    chat_ids_raw = os.environ.get('TELEGRAM_CHAT_IDS', '')
    if not (bot_token and chat_ids_raw):
        return
    for chat_id in [c.strip() for c in chat_ids_raw.split(',') if c.strip()]:
        try:
            payload = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode('utf-8')
            request = Request(
                f"https://api.telegram.org/bot{bot_token}/sendMessage",
                data=payload,
                headers={'Content-Type': 'application/json'},
                method='POST',
            )
            urlopen(request, timeout=4)
        except Exception:
            pass


def resp(code: int, payload: Dict[str, Any]) -> Dict[str, Any]:
    return {'statusCode': code, 'headers': HEADERS, 'body': json.dumps(payload)}


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Принимает заявку на бесплатную стартовую встречу со страницы /session,
    сохраняет её в БД, отправляет уведомления и добавляет лид в Google Таблицу."""
    method = event.get('httpMethod', 'POST')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': HEADERS, 'body': ''}
    if method != 'POST':
        return resp(405, {'error': 'Method not allowed'})

    try:
        data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return resp(400, {'error': 'Invalid JSON'})

    user_name = (data.get('user_name') or '').strip()
    user_email = (data.get('user_email') or '').strip()
    user_phone = (data.get('user_phone') or '').strip()

    if not user_name:
        return resp(400, {'error': 'user_name is required'})
    if not user_email or not EMAIL_REGEX.match(user_email):
        return resp(400, {'error': 'Valid user_email is required'})
    if not user_phone:
        return resp(400, {'error': 'user_phone is required'})

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    try:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO session_requests (user_name, user_email, user_phone)
            VALUES (%s, %s, %s)
            RETURNING id, status, created_at
            """,
            (user_name, user_email, user_phone),
        )
        request_id, request_status, request_created_at = cur.fetchone()
        conn.commit()
        cur.close()
    finally:
        conn.close()

    text = (
        f"📋 Новая заявка на стартовую встречу\n"
        f"Формат: {FORMAT_TITLE}\n"
        f"Клиент: {user_name}\n"
        f"Email: {user_email}\n"
        f"Телефон: {user_phone}"
    )
    jobs = [
        (send_email_notification, ("Новая заявка на стартовую встречу", text)),
        (send_telegram_notification, (text.replace("📋 Новая заявка на стартовую встречу", "📋 <b>Новая заявка на стартовую встречу</b>", 1),)),
    ]

    row = [
        'Стартовая встреча',
        request_id,
        '',
        'session',
        user_name,
        user_email,
        user_phone,
        '',
        '',
        request_status,
        '',
        str(request_created_at),
        '',
        '',
        FORMAT_TITLE,
    ]
    jobs.append((append_row, ('Лиды-2110', row)))

    threads = [threading.Thread(target=fn, args=args) for fn, args in jobs]
    for t in threads:
        t.start()
    for t in threads:
        t.join()

    return resp(200, {'id': request_id, 'status': 'ok'})
