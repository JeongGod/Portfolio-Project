from backend import db

class racerProject(db.Model):
    __tablename__ = 'racerProject'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no            = db.Column(db.Integer, FORIGEN_KEY=True, nullable=False)
    project_name        = db.Column(db.String(20))
    project_detail      = db.Column(db.String(255))
    project_start_date  = db.Column(db.DateTime)
    project_end_date    = db.Column(db.DateTime)