from controller.auth import Login, Logout, SignUp
from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from flask_cors import CORS
from db_connect import db
import config


def create_app():
    app = Flask(__name__)

    # API 설정
    api = Api(app)
    api.add_resource(Login, '/login')
    api.add_resource(Logout, '/logout')
    api.add_resource(SignUp, '/signup')

    # DB 및 마이그레이션 설정
    app.config.from_object(config)
    db.init_app(app)
    Migrate().init_app(app, db)

    from models import racers, educations, awards, projects, certificates

    ### 추후 수정예정
    CORS(app)
    ###
    return app

if __name__ == "__main__":
    create_app().run(debug=True)
