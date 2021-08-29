import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { loginApi, googleLoginApi } from "api/auth";
import { setToken } from "reducers/token";
import "components/pages/login/index.css";
import { Button, Form } from "react-bootstrap";
import { GoogleLogin } from 'react-google-login';
import AlertModal from "components/pages/AlertModal";

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

  const [modalData, setModalData] = useState({
    show : false,
    title : "",
    desc : ""
  });

  const handleModalData = (title, desc) => {
    setModalData({
      show : true,
      title,
      desc
    })

  }
  const handleClose = () => setModalData({
    show : false,
    title : "",
    desc : ""
  });

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
      handleModalData("로그인 실패", "존재하는 이메일이 아닙니다.");
    } else {
      handleModalData("로그인 실패", "아이디와 비밀번호를 확인해주세요.")
    }
  };

  const googleSuccess = async (res) => {
    const response = await googleLoginApi(res);
    handleToken(response.data.access_token);
  }
  const googleFailure = (error) => {
    console.log(error);
  }

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
        <GoogleLogin
          clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
          responseType="code"
          accessType="offline"
          prompt= "select_account"
          scope= {process.env.REACT_APP_GOOGLE_SCOPE}
          state="state_parameter_passthrough_value"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
        />
        <Link to="/signup">
          <Button variant="info">회원가입</Button>
        </Link>
      </Form>

      {modalData.show && <AlertModal data={modalData} handleClose={handleClose} /> }
    </div>
  );
};

// clientId = {google_oauth2_client_id}
//           buttonText="구글 계정으로 로그인"
//           prompt="select_account"
          


export default Login;
