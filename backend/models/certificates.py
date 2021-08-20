from dataclasses import dataclass
from db_connect import db

@dataclass
class certificates(db.Model):
    __tablename__ = 'certificates'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    cert_id: int
    cert_name: str
    cert_detail: str
    cert_achieve_date: str

    cert_id             = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_id            = db.Column(db.String(20), db.ForeignKey('racers.racer_id', ondelete='CASCADE', onupdate='CASCADE'), nullable=False)
    cert_name           = db.Column(db.String(20))
    cert_detail         = db.Column(db.String(255))
    cert_achieve_date   = db.Column(db.DateTime)

    def __init__(self, racer_id, cert_name, cert_detail, cert_achieve_date):
        self.racer_id           = racer_id
        self.cert_name          = cert_name
        self.cert_detail        = cert_detail
        self.cert_achieve_date  = cert_achieve_date
