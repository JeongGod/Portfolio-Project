import requests
from config import (GOOGLE_OAUTH2_CLIENT_ID, GOOGLE_OAUTH2_CLIENT_SECRET,
                    REDIRECT_URI, SCOPE)
from flask import Blueprint, redirect, request
from service.google_auth_service import Google_Auth

google_auth = Blueprint('google_auth', __name__, url_prefix='/api/auth/google')

@google_auth.route('/authorize', methods=['POST'])
def authorize():
    if 'code' not in request.json:
        auth_uri = ('https://accounts.google.com/o/oauth2/v2/auth?response_type=code'
                    '&client_id={}&redirect_uri={}&scope={}').format(GOOGLE_OAUTH2_CLIENT_ID, REDIRECT_URI, SCOPE)
        return redirect(auth_uri)
    else:
        auth_code = request.json.get('code')
        data = {'code': auth_code,
                'client_id': GOOGLE_OAUTH2_CLIENT_ID,
                'client_secret': GOOGLE_OAUTH2_CLIENT_SECRET,
                'redirect_uri': REDIRECT_URI,
                'grant_type': 'authorization_code'}
        tokens = requests.post("https://oauth2.googleapis.com/token", data=data)

        return Google_Auth.login_user(tokens.json())
