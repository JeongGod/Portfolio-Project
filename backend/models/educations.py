from db_connect import db

class educations(db.Model):
    __tablename__ = 'education'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    edu_id      = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no    = db.Column(db.Integer, db.ForeignKey('racers.racer_no', ondelete='CASCADE'), nullable=False)
    school_name = db.Column(db.String(20))
    major       = db.Column(db.String(20))
    education   = db.Column(db.String(10))