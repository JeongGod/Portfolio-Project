from backend import db

class racerProfile(db.Model):
    __tablename__ = 'racerProfile'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no    = db.Column(db.Integer, FORIGEN_KEY=True, nullable=False)
    image       = db.Column(db.String(2048))
    introduce   = db.Column(db.String(255))