import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { loginApi } from "api/authApi";
import { setToken } from "reducers/token";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const idRef = useRef();
  const pwRef = useRef();
  
  const handleToken = (token) => {
    dispatch(setToken(token));
    history.replace('/home')
  };

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
    <div>
      <form onSubmit={handlerSubmit}>
        <label name="id">ID : </label>
        <input ref={idRef} type="text" />
        <br />
        <label name="pw">PW : </label>
        <input ref={pwRef} type="password" />
        <br />
        <input type="submit" value="로그인" />
      </form>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
