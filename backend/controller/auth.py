from bcrypt import gensalt, hashpw
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from service.auth_service import Auth

auth = Blueprint('auth', __name__, url_prefix='api/auth')

@auth.route('/login', methods=['POST'])
def login():
    info = request.json
    return Auth.login_user(data=info)

@auth.route('/logout', methods=['POST'])
def logout():
    auth_header = request.headers.get('Authorization')
    return Auth.logout_user(data=auth_header)

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json
    # 암호화
    data['pw'] = hashpw(data['pw'].encode('utf-8'),
                        gensalt()).decode('utf-8')
    return Auth.signup_user(data=data)

@auth.route('/refresh', methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    print(identity)
    return Auth.check_refresh_token(identity)
    