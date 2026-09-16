import json
import os
from typing import Dict, Any

import psycopg2


def handler(event: Dict[str, Any], context) -> Dict[str, Any]:
    """Возвращает статус заказа ЮKassa по номеру заказа (order_number).
    Используется страницей /order-status для отображения результата оплаты.
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

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    try:
        cur = conn.cursor()
        order_number_esc = order_number.replace("'", "''")
        cur.execute(f"""
            SELECT order_number, tariff_id, status, amount, user_name, user_email, created_at, paid_at
            FROM orders
            WHERE order_number = '{order_number_esc}'
        """)
        row = cur.fetchone()
        cur.close()
    finally:
        conn.close()

    if not row:
        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Order not found'}),
        }

    result = {
        'order_number': row[0],
        'tariff_id': row[1],
        'status': row[2],
        'amount': float(row[3]) if row[3] is not None else None,
        'user_name': row[4],
        'user_email': row[5],
        'created_at': row[6].isoformat() if row[6] else None,
        'paid_at': row[7].isoformat() if row[7] else None,
    }

    return {
        'statusCode': 200,
        'headers': headers,
        'body': json.dumps(result),
    }
