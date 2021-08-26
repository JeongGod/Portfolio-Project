import requests
from db_connect import db
from flask import jsonify, redirect
from flask_jwt_extended import create_access_token, create_refresh_token
from models.racers import racers


class Google_Auth:
    def login_user(tokens):
        # google에서 발급한 token
        google_access_token = tokens.get('access_token')
        google_refresh_token = tokens.get('refresh_token')

        # 유저 정보 받아오기
        headers = {
            'Authorization' : f'Bearer {google_access_token}'
        }
        profile = requests.get('https://www.googleapis.com/oauth2/v1/userinfo', headers=headers).json()

        try :
            email = profile.get('email')
            name = profile.get('name')
            user = db.session.query(racers).filter(racers.racer_id == email).first()
            # 유저가 없다면 회원가입
            if user is None:
                # 비밀번호 어떻게 처리할 지 생각 => 일단은 google_access_token으로 처리
                user = racers(email, google_access_token, name)
                db.session.add(user)
                db.session.commit()
            access_token = create_access_token(identity = user.racer_id)
            refresh_token = create_refresh_token(identity= user.racer_id)
            user.setToken(refresh_token)
            return jsonify(result="success", access_token=access_token, refresh_token=refresh_token)
        
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")
