from db_connect import db

class certificates(db.Model):
    __tablename__ = 'certificated'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    cert_id                     = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no                    = db.Column(db.Integer, db.ForeignKey('racers.racer_no', ondelete='CASCADE'), nullable=False)
    certificated_name           = db.Column(db.String(20))
    certificated_detail         = db.Column(db.String(255))
    certificated_achieve_date   = db.Column(db.DateTime)