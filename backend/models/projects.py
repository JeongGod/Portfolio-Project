from dataclasses import dataclass
from db_connect import db

@dataclass
class projects(db.Model):
    __tablename__ = 'projects'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    project_id: int
    project_name: str
    project_detail: str
    project_start_date: str
    project_end_date: str

    project_id          = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_id            = db.Column(db.String(20), db.ForeignKey('racers.racer_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    project_name        = db.Column(db.String(20))
    project_detail      = db.Column(db.String(255))
    project_start_date  = db.Column(db.DateTime)
    project_end_date    = db.Column(db.DateTime)

    def __init__(self, racer_id, project_name, project_detail, project_start_date, project_end_date):
        self.racer_id           = racer_id
        self.project_name       = project_name
        self.project_detail     = project_detail
        self.project_start_date = project_start_date
        self.project_end_date   = project_end_date
