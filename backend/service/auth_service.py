from models.racers import racers
from db_connect import db

class Auth:

    def signup_user(data):
        user = db.session.query(racers).filter(racers.racer_id == data.id)
        if user is None:
            new_racer = racers(data.id, data.pw, data.name, data.image, data.introduce)
            try:
                db.session.add(new_racer)
                db.session.commit()
                return "success"
            except Exception.SQLALchemyError:
                db.session.rollback()
                return "fail"
        return "exist"