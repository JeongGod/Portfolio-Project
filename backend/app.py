from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

import config
from controller.auth import auth
from controller.google_auth import google_auth
from controller.user import user
from db_connect import db


def create_app():
    app = Flask(__name__)

    # JWT 설정
    jwt = JWTManager(app)

    # API 설정
    app.register_blueprint(auth)
    app.register_blueprint(user)
    app.register_blueprint(google_auth)

    # DB 및 마이그레이션 설정
    app.config.from_object(config)
    db.init_app(app)
    Migrate().init_app(app, db)

    from models import awards, certificates, educations, projects, racers

    ### 추후 수정예정
    CORS(app)
    ###
    return app

if __name__ == "__main__":
    create_app().run(debug=True)
