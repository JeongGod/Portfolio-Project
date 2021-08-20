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
            
            edus_data       = educations.query.filter_by(racer_id=user.racer_id).all()
            awards_data     = awards.query.filter_by(racer_id=user.racer_id).all()
            projects_data   = projects.query.filter_by(racer_id=user.racer_id).all()
            certs_data      = certificates.query.filter_by(racer_id=user.racer_id).all()
            return jsonify(
                edus            = edus_data,
                award           = awards_data,
                projects        = projects_data,
                certificates    = certs_data
                )
        except Exception as e:
            print(e)
            return jsonify(result="fail")
    '''
    1. 전체 객체를 받는다.
    2. 전체 객체의 아이디를 하나씩 돌아보면서 디비에 있는지 확인한다.
        3-1. 있다면, 해당 객체를 업데이트한다.
        3-2. 없다면, 해당 객체를 새로 만들어 업데이트한다.
    '''
    def update_edu(id, data):
        try :
            edus_data = data.get('edu')
            print(edus_data)

        except Exception as e:
            print(e)
            return jsonify(result="fail")