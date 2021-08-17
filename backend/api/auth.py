from flask_restful import Resource, reqparse
from db_connect import db
from models.racers import racers

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
        parser.add_argument('image', type=str)
        parser.add_argument('introduce', type=str)
        args = parser.parse_args()
        
        new_user = racers(args['id'], args['pw'], args['name'], args['image'], args['introduce'])
        db.session.add(new_user)
        db.session.commit()
        return {"new_user.id" : "test"}