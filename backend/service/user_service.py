from db_connect import db
from models.racers import racers
from models.educations import educations
from models.awards import awards
from models.projects import projects
from models.certificates import certificates
from datetime import date
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
                user            = user,
                edus            = edus_data,
                awards          = awards_data,
                projects        = projects_data,
                certificates    = certs_data
                )
        except Exception as e:
            print(e)
            return jsonify(result="fail")
    '''
    1. 전체 객체를 받는다.
    2. 해당 모델 객체를 생성한다.
    3. 만약 id값의 문자열이 str이라면 "새로 추가된 객체"로 여긴다.
    '''
    def update_profile(user_id, data):
        try:
            profile_data = data.get('profile')
            racer = racers.query.filter_by(racer_id=user_id).first()
            racer.introduce = profile_data.get('introduce')
            racer.image = profile_data.get('image')
            
            db.session.add(racer)
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")

    def update_edus(user_id, data):
        try :
            edus_data = data.get('edus')

            for edu in edus_data:
                new_edu = educations(user_id, edu['school_name'], edu['major'], edu['education'])
                if type(edu.get('edu_id')) != str:
                    new_edu.edu_id = edu.get('edu_id')
                db.session.merge(new_edu)
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")

    def update_awards(user_id, data):
        try :
            awards_data = data.get('awards')
            
            for award in awards_data:
                new_award = awards(user_id, award['award_name'], award['award_detail'])
                if type(award.get('award_id')) != str:
                    new_award.award_id = award.get('award_id')
                db.session.merge(new_award)
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")
    
    def update_projects(user_id, data):
        try :
            projects_data = data.get('projects')
            for project in projects_data:
                start = project['project_start_date']
                end   = project['project_end_date']

                new_project = projects(user_id, project['project_name'], project['project_detail'], date.fromisoformat(start[:start.index('T')]), date.fromisoformat(end[:end.index('T')]))
                if type(project.get('project_id')) != str:
                    new_project.project_id = project.get('project_id')
                db.session.merge(new_project)
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")
    
    def update_certs(user_id, data):
        try :
            certs_data = data.get('certs')

            for cert in certs_data:
                achieve = cert['cert_achieve_date']

                new_cert = certificates(user_id, cert['cert_name'], cert['cert_detail'], date.fromisoformat(achieve[:achieve.index('T')]))
                if type(cert.get('cert_id')) != str:
                    new_cert.cert_id = cert.get('cert_id')
                db.session.merge(new_cert)
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")

    def delete_edu(data_id):
        try:
            educations.query.filter(educations.edu_id == data_id).delete()
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")
    
    def delete_award(data_id):
        try:
            awards.query.filter(awards.award_id == data_id).delete()
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")

    def delete_project(data_id):
        try:
            projects.query.filter(projects.project_id == data_id).delete()
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")

    def delete_cert(data_id):
        try:
            certificates.query.filter(certificates.cert_id == data_id).delete()
            db.session.commit()
            return jsonify(result="success")
        except Exception as e:
            db.session.rollback()
            print(e)
            return jsonify(result="fail")