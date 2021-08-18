from models.racers import racers
from db_connect import db

class Auth:

    def signup_user(data):
        new_racer = racers(data.racer_id, data.racer_pw, data.racer_name, data.image, data.introduce)
        db.session.add(new_racer)
        db.session.commit()
        return data.racer_id