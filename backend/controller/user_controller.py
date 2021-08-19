from service.user_service import User
from flask import request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity

user = Blueprint('user', __name__, url_prefix='/userinfo')

@user.route('/all', methods=['GET'])
@jwt_required()
def user_info():
    info = get_jwt_identity()
    return User.get_user_all(id=info)