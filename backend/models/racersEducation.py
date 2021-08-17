from backend import db

class racerEducation(db.Model):
    __tablename__ = 'racerEducation'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no    = db.Column(db.Integer, FORIGEN_KEY=True, nullable=False)
    school_name = db.Column(db.String(20))
    major       = db.Column(db.String(20))
    education   = db.Column(db.String(10))