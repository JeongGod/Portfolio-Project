from flask import Flask
from flask_restful import Api, Resource, reqparse
from models.racers import racers
from app import db

class Login(Resource):
    """로그인"""
    def get(self):
        pass

class Logout(Resource):
    """로그아웃"""
    def post(self):
        pass

class SignUp(Resource):
    """회원가입"""
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('id', type=str)
        parser.add_argument('pw', type=str)
        parser.add_argument('name', type=str)
        args = parser.parse_args()
        
        new_user = racers(args['id'], args['pw'], args['name'])
        db.session.add(new_user)
        db.session.commit()
        return {"new_user.id" : new_user.racer_id}