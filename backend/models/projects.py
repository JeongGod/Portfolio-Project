from db_connect import db

class projects(db.Model):
    __tablename__ = 'project'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    project_id          = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no            = db.Column(db.Integer, db.ForeignKey('racers.racer_no', ondelete='CASCADE'), nullable=False)
    project_name        = db.Column(db.String(20))
    project_detail      = db.Column(db.String(255))
    project_start_date  = db.Column(db.DateTime)
    project_end_date    = db.Column(db.DateTime)