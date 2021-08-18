from db_connect import db

class racers(db.Model):
    __tablename__ = 'racers'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    racer_no    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    racer_id    = db.Column(db.String(20), nullable=False)
    racer_pw    = db.Column(db.String(255), nullable=False)
    racer_name  = db.Column(db.String(20), nullable=False)
    image       = db.Column(db.String(2048))
    introduce   = db.Column(db.String(255))

    def __init__(self, racer_id, racer_pw, racer_name, image, introduce):
        self.racer_id   = racer_id
        self.racer_pw   = racer_pw
        self.racer_name = racer_name
        self.image      = image
        self.introduce  = introduce

class racerEducation(db.Model):
    __tablename__ = 'racerEducation'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    edu_id      = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no    = db.Column(db.Integer, db.ForeignKey('racers.racer_no'), nullable=False)
    school_name = db.Column(db.String(20))
    major       = db.Column(db.String(20))
    education   = db.Column(db.String(10))

class racerAwards(db.Model):
    __tablename__ = 'racerAwards'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    awadrd_id       = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no        = db.Column(db.Integer, db.ForeignKey('racers.racer_no'), nullable=False)
    award_name      = db.Column(db.String(20))
    award_detail    = db.Column(db.String(255))

class racerProject(db.Model):
    __tablename__ = 'racerProject'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    project_id          = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no            = db.Column(db.Integer, db.ForeignKey('racers.racer_no'), nullable=False)
    project_name        = db.Column(db.String(20))
    project_detail      = db.Column(db.String(255))
    project_start_date  = db.Column(db.DateTime)
    project_end_date    = db.Column(db.DateTime)

class racerCertificated(db.Model):
    __tablename__ = 'racerCertificated'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    cert_id                     = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    racer_no                    = db.Column(db.Integer, db.ForeignKey('racers.racer_no'), nullable=False)
    certificated_name           = db.Column(db.String(20))
    certificated_detail         = db.Column(db.String(255))
    certificated_achieve_date   = db.Column(db.DateTime)