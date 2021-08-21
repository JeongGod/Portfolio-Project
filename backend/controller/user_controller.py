import jwt
from service.user_service import User
from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

user = Blueprint('user', __name__, url_prefix='/user-info')

@user.route('', methods=['GET'])
@jwt_required()
def user_info():
    id = get_jwt_identity()
    return User.get_user_info(id=id)

@user.route('/profile', methods=['PATCH'])
@jwt_required()
def profile():
    id = get_jwt_identity()
    profile_data = request.json

    return User.update_profile(user_id=id, data=profile_data)

# 전체 객체를 가지고와 수정을 하기 때문에 put method로 처리한다.
@user.route('/<string:type>', methods=['PUT'])
@jwt_required()
def edus(type):
    id = get_jwt_identity()
    data = request.json
    if type == 'edus':
        return User.update_edus(user_id=id, data=data)
    elif type == 'awards':
        return User.update_awards(user_id=id, data=data)
    elif type == 'projects':
        return User.update_projects(user_id=id, data=data)
    elif type == 'certs':
        return User.update_certs(user_id=id, data=data)
    return "incorrect type"

@user.route('/<string:type>/<int:data_id>', methods=['DELETE'])
@jwt_required()
def delete_data(type, data_id):
    id = get_jwt_identity()
    print(type, data_id)
    if type == 'edu':
        return User.delete_edu(data_id=data_id)
    elif type == 'award':
        return User.delete_award(data_id=data_id)
    elif type == 'project':
        return User.delete_project(data_id=data_id)
    elif type == 'cert':
        return User.delete_cert(data_id=data_id)
    return "incorrect type"

@user.route('/all', methods=['GET'])
@jwt_required()
def get_other_users():
    id = get_jwt_identity()
    return User.get_other_users(id)

@user.route('/<string:racer_id>', methods=['GET'])
@jwt_required()
def get_search_user(racer_id):
    return User.get_user_info(racer_id)