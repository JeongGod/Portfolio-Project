from dataclasses import dataclass

from db_connect import db


@dataclass
class racers(db.Model):
    __tablename__ = 'racers'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_id: int
    racer_name: str
    image: str
    introduce: str

    racer_id    = db.Column(db.String(50), primary_key=True, nullable=False)
    racer_pw    = db.Column(db.String(255), nullable=False)
    racer_name  = db.Column(db.String(20), nullable=False)
    image       = db.Column(db.String(2048))
    introduce   = db.Column(db.String(255))
    token       = db.Column(db.String(2048))

    def __init__(self, racer_id, racer_pw, racer_name):
        self.racer_id   = racer_id
        self.racer_pw   = racer_pw
        self.racer_name = racer_name
    
    def setToken(self, token):
        self.token = token
        db.session.commit()
