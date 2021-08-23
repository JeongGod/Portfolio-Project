import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { loginApi } from "api/auth";
import { setToken } from "reducers/token";
import "components/pages/login/index.css";
import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";

const Login = () => {
  const { accessToken } = useSelector((state) => state.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const idRef = useRef();
  const pwRef = useRef();
  
  const handleToken = (token) => {
    dispatch(setToken(token));
    history.replace('/home')
  };

  useEffect(() => {
    if(accessToken) {
      history.replace("/home");
    }
  }, [])

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const info = {
      id: idRef.current.value,
      pw: pwRef.current.value,
    };
    const response = await loginApi(info, handleToken);
    if (response.data.result === "success") {
      handleToken(response.data.access_token)
      
    } else if (response.data.result === "no exist") {
      alert("존재하는 ID가 아닙니다.");
    } else {
      alert("아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div class="wrapperForm">
      <h3>Racer Portfolio</h3>
      <Form onSubmit={handlerSubmit}>
        <Form.Label name="id">Email</Form.Label>
        <Form.Control ref={idRef} type="text" placeholder="elice@elice.com" />
        <Form.Label name="pw">PW</Form.Label>
        <Form.Control ref={pwRef} type="password" />
        <Button variant="primary" type="submit">
          로그인
        </Button>
        <Link to="/signup">
          <Button variant="info">회원가입</Button>
        </Link>
      </Form>
    </div>
  );
};

export default Login;
