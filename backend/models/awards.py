from dataclasses import dataclass
from db_connect import db

@dataclass
class awards(db.Model):
    __tablename__ = 'awards'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    award_id: int
    award_name: str
    award_detail: str

    award_id        = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_id        = db.Column(db.String(20), db.ForeignKey('racers.racer_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    award_name      = db.Column(db.String(20))
    award_detail    = db.Column(db.String(255))
    
    def __init__(self, award_name, award_detail):
        self.award_name   = award_name
        self.award_detail = award_detail