from app import db

class racers(db.Model):
    __tablename__ = 'racers'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    racer_id    = db.Column(db.String(20), nullable=False)
    racer_pw    = db.Column(db.String(255), nullable=False)
    racer_name  = db.Column(db.String(20), nullable=False)

    def __init__(self, racer_id, racer_pw, racer_name):
        self.racer_id   = racer_id
        self.racer_pw   = racer_pw
        self.racer_name = racer_name
    