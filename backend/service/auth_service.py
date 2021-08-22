from flask import jsonify
from models.racers import racers
from db_connect import db
from bcrypt import checkpw
from flask_jwt_extended import create_access_token, create_refresh_token

class Auth:
    def login_user(data):
        try :
            user = db.session.query(racers).filter(
                racers.racer_id == data.get('id')).first()

            if user is None:
                return jsonify(result="no exist")
            elif not checkpw(data.get('pw').encode('utf-8'), user.racer_pw.encode('utf-8')):
                return jsonify(result="not equal")
            else:
                # 로그인 성공 => JWT토큰 발행
                access_token = create_access_token(identity = user.racer_id)
                refresh_token = create_refresh_token(identity= user.racer_id)
                user.setToken(refresh_token)
                return jsonify(result="success", access_token=access_token, refresh_token=refresh_token)
        except Exception as e:
            print(e)
            return jsonify(result="fail")

    def logout_user(data):
        user = db.session.query(racers).filter(racers.token == data).first()
        if user:
            user.setToken(None)
        return jsonify(result="success")

    def signup_user(data):
        user = db.session.query(racers).filter(
            racers.racer_id == data.get('id')).first()

        if user is None:
            new_racer = racers(data.get('id'), data.get('pw'), data.get('name'))
            try:
                db.session.add(new_racer)
                db.session.commit()
                return jsonify(result= "success")
            except Exception.SQLALchemyError:
                db.session.rollback()
                return jsonify(result="fail")
        return jsonify(result="exist")

    def check_refresh_token(identity):
        user = racers.query.filter(racers.racer_id == identity).first()
        if user:
            access_token = create_access_token(identity=identity)
            return jsonify(access_token=access_token), 201
        return jsonify(result="fail")
    
    
