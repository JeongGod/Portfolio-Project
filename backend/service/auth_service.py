from models.racers import racers
from db_connect import db
from bcrypt import checkpw


class Auth:
    def login_user(data):
        user = db.session.query(racers).filter(
            racers.racer_id == data.id).first()

        if user is None:
            return {
                "result": "no exist"
            }
        elif not checkpw(data.pw.encode('utf-8'), user.racer_pw.encode('utf-8')):
            return {
                "result": "not equal"
            }
        else:
            return {
                "result": "success",
            }

    def signup_user(data):
        user = db.session.query(racers).filter(
            racers.racer_id == data.id).first()

        if user is None:
            new_racer = racers(data.id, data.pw, data.name,
                               data.image, data.introduce)
            try:
                db.session.add(new_racer)
                db.session.commit()
                return {
                    "result": "success"
                }
            except Exception.SQLALchemyError:
                db.session.rollback()
                return {
                    "result": "fail"
                }
        return {
            "result": "exist"
        }
