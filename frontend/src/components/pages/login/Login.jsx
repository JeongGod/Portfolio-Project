import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginApi } from "../../../api/authApi";
import { setToken } from "../../../reducers/token";

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const idRef = useRef();
  const pwRef = useRef();
  
  const handleToken = (token) => {
    dispatch(setToken(token));
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const info = {
      id : idRef.current.value,
      pw : pwRef.current.value
    }
    loginApi(info, history, handleToken)
  };

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label name="id">ID : </label>
        <input
          ref={idRef}
          type="text"
        />
        <br />
        <label name="pw">PW : </label>
        <input
          ref={pwRef}
          type="password"
        />
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
