from models.racers import racers
from db_connect import db

class Auth:

    def signup_user(data):
        new_racer = racers(data.racer_id, data.racer_pw, data.racer_name, data.image, data.introduce)
        user = db.session.query(racers).filter(racers.racer_id == new_racer.racer_id)
        if user is None:
            try:
                db.session.add(new_racer)
                db.session.commit()
                return "success"
            except Exception.SQLALchemyError:
                db.session.rollback()
                return "fail"
        return "exist"