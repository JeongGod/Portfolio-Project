from flask import session
from service.auth_service import Auth
from flask_restful import Resource, reqparse

class Login(Resource):
    """로그인"""
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        
        return 
        pass

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
        
        return Auth.signup_user(args)