from db_connect import db

class awards(db.Model):
    __tablename__ = 'awards'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    awadrd_id       = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no        = db.Column(db.Integer, db.ForeignKey('racers.racer_no', ondelete='CASCADE'), nullable=False)
    award_name      = db.Column(db.String(20))
    award_detail    = db.Column(db.String(255))