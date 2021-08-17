from backend import db

class racerAwards(db.Model):
    __tablename__ = 'racerAwards'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no        = db.Column(db.Integer, FORIGEN_KEY=True, nullable=False)
    award_name      = db.Column(db.String(20))
    award_detail    = db.Column(db.String(255))