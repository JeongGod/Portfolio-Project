from api.auth import *
from api.portfolio import PortfolioUser
from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # api
    api = Api(app)
    api.add_resource(PortfolioUser, '/home')
    api.add_resource(Login, '/login')
    api.add_resource(Logout, '/logout')
    api.add_resource(SignUp, '/signup')
    
    app.config.from_object(config)
    db.init_app(app)
    Migrate().init_app(app, db)

    # 세션 암호키 추후에 변경
    app.secret_key = "test"
    app.config['SESSION_TYPE'] = 'filesystem'
    ###### 현재 개발단계 추후에 삭제
    CORS(app)
    ######

    return app


if __name__ == "__main__":
    create_app().run(debug=True)