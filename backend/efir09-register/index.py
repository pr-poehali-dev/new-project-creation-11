import json
import os
import re
from typing import Dict, Any

import psycopg2


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Регистрация участников на вебинар «Сильная снаружи, сломанная внутри» (22.09).
    Принимает POST с полями name, email, phone (опц.), consent и UTM-метками, сохраняет в БД.
    """
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    headers = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': headers,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    try:
        body_data = json.loads(event.get('body') or '{}')
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Invalid JSON'}),
        }

    name = (body_data.get('name') or '').strip()
    email = (body_data.get('email') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    consent = bool(body_data.get('consent'))
    utm_source = (body_data.get('utm_source') or '').strip()
    utm_medium = (body_data.get('utm_medium') or '').strip()
    utm_campaign = (body_data.get('utm_campaign') or '').strip()
    utm_content = (body_data.get('utm_content') or '').strip()
    utm_term = (body_data.get('utm_term') or '').strip()

    email_pattern = r'^[^@\s]+@[^@\s]+\.[^@\s]+$'

    if not name or len(name) < 2:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Укажите имя'}),
        }

    if not email or not re.match(email_pattern, email):
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Укажите корректный email'}),
        }

    if not consent:
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps({'error': 'Нужно согласие на обработку персональных данных'}),
        }

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        name_esc = name.replace("'", "''")
        email_esc = email.replace("'", "''")
        phone_esc = phone.replace("'", "''")
        utm_source_esc = utm_source.replace("'", "''")
        utm_medium_esc = utm_medium.replace("'", "''")
        utm_campaign_esc = utm_campaign.replace("'", "''")
        utm_content_esc = utm_content.replace("'", "''")
        utm_term_esc = utm_term.replace("'", "''")

        query = f"""
            INSERT INTO efir09_registrations
                (name, email, phone, consent, utm_source, utm_medium, utm_campaign, utm_content, utm_term)
            VALUES
                ('{name_esc}', '{email_esc}', {f"'{phone_esc}'" if phone_esc else 'NULL'}, {consent},
                 {f"'{utm_source_esc}'" if utm_source_esc else 'NULL'},
                 {f"'{utm_medium_esc}'" if utm_medium_esc else 'NULL'},
                 {f"'{utm_campaign_esc}'" if utm_campaign_esc else 'NULL'},
                 {f"'{utm_content_esc}'" if utm_content_esc else 'NULL'},
                 {f"'{utm_term_esc}'" if utm_term_esc else 'NULL'})
            RETURNING id
        """
        cur.execute(query)
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
    finally:
        conn.close()

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps({'success': True, 'id': new_id}),
    }
