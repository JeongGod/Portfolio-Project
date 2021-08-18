from service.auth_service import Auth
from flask_restful import Resource, reqparse
from bcrypt import hashpw, gensalt


class Login(Resource):
    """로그인"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        args = parser.parse_args()

        return Auth.login_user(args)


class Logout(Resource):
    """로그아웃"""

    def get(self):
        pass


class SignUp(Resource):
    """회원가입"""

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        parser.add_argument('name', type=str)
        parser.add_argument('image', type=str)
        parser.add_argument('introduce', type=str)
        args = parser.parse_args()
        # 암호화
        args['pw'] = hashpw(args['pw'].encode('utf-8'),
                            gensalt()).decode('utf-8')

        return Auth.signup_user(args)
