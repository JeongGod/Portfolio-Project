import requests
from db_connect import db
from flask import jsonify
from models.racers import racers


class Google_Auth:
    def login_user(tokens):
        # google에서 발급한 token
        access_token = tokens.get('access_token')
        refresh_token = tokens.get('refresh_token')
        # 유저 정보 받아오기
        headers = {
            'Authorization' : f'Bearer {access_token}'
        }
        profile = requests.get('https://www.googleapis.com/oauth2/v1/userinfo', headers=headers).json()
        
        try :
            racer = db.session.query(racers).filter(racers.racer_id == profile.email).first()
            # 유저가 없다면 회원가입
            if racer is None:
                # 비밀번호 어떻게 처리할 지 생각 => 일단은 access_token으로 처리
                new_racer = racers(profile.email, access_token, profile.name)
                new_racer.setToken(tokens.get('refresh_token'))
                db.session.add(new_racer)
                db.session.commit()
            return jsonify(result="success", access_token=access_token, refresh_token=refresh_token)
        
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")
