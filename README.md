# Portfolio Web Site
포트폴리오 웹 사이트는 자신의 정보(이름, 학력, 수상경력등)를 입력한 후, 검색을 통해 다른 사용자의 포트폴리오 정보를 확인할 수 있는 포트폴리오 웹 서비스입니다.

# 기술 스택
## Language
- Python3.6 이상 (Server)
- JavaScript (Client)

## Framework
- Flask
- React

## Database
- MySQL

## Others
- Google Cloud Platform
- Azure Storage
- Postman
- Github

## Design Pattern
- Layered Architecture

### python3.6 이상 이유
```python 
from dataclasses import dataclass
```
python3.6이상부터 지원하는 모듈인 dataclass를 사용하고 있기 때문입니다.

# About the project
<!-- ![image](https://user-images.githubusercontent.com/22341452/131253353-6af3baf7-3ed3-4e16-a778-d4181af6ed1a.png)
![image](https://user-images.githubusercontent.com/22341452/131252854-af40e7d0-4363-4c52-b47d-460109b5ff7e.png) -->

<!-- 형준님한테 허락을 맡고 올리자. -->
<!-- ![image](https://user-images.githubusercontent.com/22341452/131253289-40f41f01-77f1-45d1-88ca-bfa01d44631a.png) -->

# 힘들었던 점
Oauth2를 이용하여 구글 로그인을 구현하는 것과 JWT token을 이용하여 로그인 세션을 유지시키는 방법이 가장 어려웠습니다.

### OAuth2
Oauth2는 Client에서는 [React Google Login](https://www.npmjs.com/package/react-google-login)을 이용하여 Authorization Code를 얻은 뒤, 서버에서 해당 코드를 이용하여 토큰값을 얻고 유저 정보를 얻는 방식으로 구현했습니다.
flask에도 Oauth2 구글 로그인 라이브러리가 존재했지만 세션을 이용하는게 마음에 들지않아 제가 직접 구글 공식 문서를 참조하여 구현하게 되었습니다.

<!-- ![image](https://user-images.githubusercontent.com/22341452/131253761-8489926c-aa64-43ee-9777-a9e8ead2c04e.png) -->

### JWT Token
JWT token에 대해서는 정보가 확실치 않아서 많이 헤맸습니다. 정해진 형식이 있는게 아닌 사람마다 다 다른 방식으로 구현을 하여서 jwt 자체에 대해서 공부를 하느라 어려웠습니다.

Login요청이 들어오면 Access Token과 Refresh Token을 Server에서 "user id"를 이용해 생성합니다. 이 때 [flask-jwt-extended](https://flask-jwt-extended.readthedocs.io/en/stable/
) 라이브러리를 사용했습니다.   
Refresh Token은 DB에 저장한 뒤, Access Token과 Refresh Token을 Client에게 보냅니다. Client는 Access Token은 localstorage에 저장한 뒤, Refresh Token은 Cookie에 저장하는 방법으로 구현했습니다.

![image](https://user-images.githubusercontent.com/22341452/131253793-8368c50a-1763-449c-b0e4-d62a3f8b9dd7.png)

# Layered Architecture의 사용 이유
Spring을 공부하기 위해 책을 샀었는데 해당 책에 Layered Architecture방식으로 구현을 했던 것이 생각나 적용해보았다.

처음 만든 개인 프로젝트이기도 하고 디자인 패턴에 대해서 아직 정확하게 공부해보지 않았기 때문에 왜 이 패턴이 해당 프로젝트에 맞는지는 판단을 못 하겠다.

그렇지만 해당 디자인 패턴을 적용시키고 개발을 하면서 느낀점은 정말 디자인 패턴을 정해놓고 개발을 하는게 중요하다는 것을 깨달았다. 로직의 이해부분이나 코드의 재사용성등 많은 부분에서 이점을 얻었다.