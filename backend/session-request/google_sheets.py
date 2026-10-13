"""Minimal Google Sheets API client using a service-account JWT.

Avoids google-api-python-client: signs a JWT manually, exchanges it for an
OAuth2 access token, then calls the Sheets API values:append endpoint.
All failures are swallowed (logged) so that Sheets outages never break the
main request flow (lead/payment saving to the DB).
"""
import json
import os
import time
import base64
from datetime import datetime, timezone, timedelta
from urllib.parse import quote
from urllib.request import Request, urlopen

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

TOKEN_URL = "https://oauth2.googleapis.com/token"
SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets"
SCOPE = "https://www.googleapis.com/auth/spreadsheets"

MSK = timezone(timedelta(hours=3))


def format_msk_datetime() -> str:
    """Current date/time formatted for Moscow timezone (dd.mm.YYYY HH:MM:SS)."""
    return datetime.now(MSK).strftime('%d.%m.%Y %H:%M:%S')


def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('ascii')


def _get_access_token() -> str | None:
    """Obtain an OAuth2 access token for the Google service account."""
    raw = os.environ.get('GOOGLE_SERVICE_ACCOUNT_JSON', '')
    if not raw:
        return None

    creds = json.loads(raw)
    client_email = creds['client_email']
    private_key_pem = creds['private_key'].encode('utf-8')

    now = int(time.time())
    header = {'alg': 'RS256', 'typ': 'JWT'}
    claims = {
        'iss': client_email,
        'scope': SCOPE,
        'aud': TOKEN_URL,
        'iat': now,
        'exp': now + 3600,
    }

    signing_input = f"{_b64url(json.dumps(header).encode())}.{_b64url(json.dumps(claims).encode())}"

    private_key = serialization.load_pem_private_key(private_key_pem, password=None)
    signature = private_key.sign(signing_input.encode('ascii'), padding.PKCS1v15(), hashes.SHA256())

    jwt_token = f"{signing_input}.{_b64url(signature)}"

    payload = f"grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion={jwt_token}".encode('ascii')

    request = Request(
        TOKEN_URL,
        data=payload,
        headers={'Content-Type': 'application/x-www-form-urlencoded'},
        method='POST'
    )

    with urlopen(request, timeout=4) as response:
        token_data = json.loads(response.read().decode())

    return token_data.get('access_token')


def append_row(sheet_name: str, row: list) -> None:
    """Append a row of values to the given sheet tab. Fails silently if not configured."""
    sheet_id = os.environ.get('GOOGLE_SHEET_ID', '')
    if not sheet_id:
        return

    try:
        access_token = _get_access_token()
        if not access_token:
            return

        range_name = quote(f"{sheet_name}!A:A")
        url = (
            f"{SHEETS_API_URL}/{sheet_id}/values/{range_name}:append"
            f"?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS"
        )

        payload = json.dumps({'values': [row]}).encode('utf-8')

        request = Request(
            url,
            data=payload,
            headers={
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json'
            },
            method='POST'
        )
        urlopen(request, timeout=4)
    except Exception as e:
        print(f"GOOGLE SHEETS ERROR: sheet={sheet_name} error={e}")
