import json
import os
import re
from typing import Dict, Any

import psycopg2

EMAIL_REGEX = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}


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

    return {
        'statusCode': 200,
        'headers': HEADERS,
        'body': json.dumps({'id': request_id, 'status': 'ok'}),
    }
