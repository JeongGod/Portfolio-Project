from controller.user_controller import user
from controller.auth_controller import auth
from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db_connect import db
import config


def create_app():
    app = Flask(__name__)
    
    # JWT 설정
    jwt = JWTManager(app)

    # API 설정
    app.register_blueprint(auth)
    app.register_blueprint(user)

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
