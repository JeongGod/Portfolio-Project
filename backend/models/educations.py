from dataclasses import dataclass
from db_connect import db

@dataclass
class educations(db.Model):
    __tablename__ = 'educations'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    edu_id: int
    school_name: str
    major: str
    education: str

    edu_id      = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_id    = db.Column(db.String(50), db.ForeignKey('racers.racer_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    school_name = db.Column(db.String(20))
    major       = db.Column(db.String(20))
    education   = db.Column(db.String(10))

    def __init__(self, racer_id, school_name, major, education):
        self.racer_id       = racer_id
        self.school_name    = school_name
        self.major          = major
        self.education      = education
        