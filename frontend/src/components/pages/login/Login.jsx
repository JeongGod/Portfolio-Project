import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginApi } from "../../../api/authApi";
import { setToken } from "../../../reducers/token";

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [info, setInfo] = useState({
    id: "",
    pw: "",
  });
  
  const handleToken = (token) => {
    dispatch(setToken(token));
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    loginApi(info, history, handleToken)
  };

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label name="id">ID : </label>
        <input
          type="text"
          value={info.id}
          onChange={(e) => setInfo({ ...info, id: e.target.value })}
        />
        <br />
        <label name="pw">PW : </label>
        <input
          type="password"
          value={info.pw}
          onChange={(e) => setInfo({ ...info, pw: e.target.value })}
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
