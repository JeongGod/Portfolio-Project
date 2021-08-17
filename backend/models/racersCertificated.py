from backend import db

class racerCertificated(db.Model):
    __tablename__ = 'racerCertificated'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no                    = db.Column(db.Integer, FORIGEN_KEY=True, nullable=False)
    certificated_name           = db.Column(db.String(20))
    certificated_detail         = db.Column(db.String(255))
    certificated_achieve_date   = db.Column(db.Datetime)