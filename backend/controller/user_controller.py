from service.user_service import User
from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

user = Blueprint('user', __name__, url_prefix='/user-info')

@user.route('', methods=['GET'])
@jwt_required()
def user_info():
    id = get_jwt_identity()
    return User.get_user_all(id=id)

@user.route('/profile', methods=['PATCH'])
@jwt_required()
def profile():
    id = get_jwt_identity()
    profile_data = request.json

    return User.update_profile(user_id=id, data=profile_data)

# 전체 객체를 가지고와 수정을 하기 때문에 put method로 처리한다.
@user.route('/edus', methods=['PUT'])
@jwt_required()
def edus():
    id = get_jwt_identity()
    edus_data = request.json

    return User.update_edus(user_id=id, data=edus_data)

@user.route('/awards', methods=['PUT'])
@jwt_required()
def awards():
    id = get_jwt_identity()
    awards_data = request.json
    print(awards_data)
    return User.update_awards(user_id=id, data=awards_data)

@user.route('/projects', methods=['PUT'])
@jwt_required()
def projects():
    id = get_jwt_identity()
    projects_data = request.json

    return User.update_projects(user_id=id, data=projects_data)

@user.route('/certs', methods=['PUT'])
@jwt_required()
def certs():
    id = get_jwt_identity()
    certs_data = request.json

    return User.update_certs(user_id=id, data=certs_data)