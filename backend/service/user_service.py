from db_connect import db
from models.racers import racers
from models.educations import educations
from models.awards import awards
from models.projects import projects
from models.certificates import certificates
from flask import jsonify

class User:
    def get_user_all(id):
        try :
            user = racers.query.filter_by(racer_id=id).first()
            
            edus_data       = educations.query.filter_by(racer_no=user.racer_no).all()
            awards_data     = awards.query.filter_by(racer_no=user.racer_no).all()
            projects_data   = projects.query.filter_by(racer_no=user.racer_no).all()
            certs_data      = certificates.query.filter_by(racer_no=user.racer_no).all()
            return jsonify(
                edus            = edus_data,
                award           = awards_data,
                projects        = projects_data,
                certificates    = certs_data
                )
        except Exception as e:
            print(e)
            return jsonify(result="fail")