from flask import jsonify
from models.racers import racers
from db_connect import db
from bcrypt import checkpw
from flask_jwt_extended import create_access_token, create_refresh_token

class Auth:
    def login_user(data):
        user = db.session.query(racers).filter(
            racers.racer_id == data.id).first()

        if user is None:
            return jsonify(result="no exist")
        elif not checkpw(data.pw.encode('utf-8'), user.racer_pw.encode('utf-8')):
            return jsonify(result="not equal")
        else:
            # 로그인 성공 => JWT토큰 발행
            access_token = create_access_token(identity = user.racer_id)
            refresh_token = create_refresh_token(identity= user.racer_id)
            user.setToken(refresh_token)
            return jsonify(result="success", access_token=access_token, refresh_token=refresh_token)

    def signup_user(data):
        user = db.session.query(racers).filter(
            racers.racer_id == data.id).first()

        if user is None:
            new_racer = racers(data.id, data.pw, data.name)
            try:
                db.session.add(new_racer)
                db.session.commit()
                return jsonify(result= "success")
            except Exception.SQLALchemyError:
                db.session.rollback()
                return jsonify(result="fail")
        return jsonify(result="exist")
