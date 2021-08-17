from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import config


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # API 설정
    api = Api(app)

    # DB 및 마이그레이션 설정
    app.config.from_object(config)
    db.init_app(app)
    Migrate().init_app(app, db)

    from models import racers

    ###### 현재 개발단계 추후에 삭제
    app.secret_key = "test"
    app.config['SESSION_TYPE'] = 'filesystem'
    CORS(app)
    ######
    return app
'''
auth.py
'''


# API 설정
# api.add_resource(Login, '/login')
# api.add_resource(Logout, '/logout')
# api.add_resource(SignUp, '/signup')

'''
portfolio.py
'''


# API 설정
# api.add_resource(PortfolioUser, '/home')

if __name__ == "__main__":
    create_app().run(debug=True)
