from flask_restful import Resource, request
from flask_jwt_extended import jwt_required, get_jwt_identity


class PortfolioUser(Resource):
    """해당 User의 Portfolio 데이터를 가져옵니다."""
    def get(self):
        pass
    
    """해당 User의 새로운 경력을 생성합니다."""
    def post(self):
        pass

    """해당 User의 Portfolio 데이터를 변경합니다."""
    def put(self):
        pass