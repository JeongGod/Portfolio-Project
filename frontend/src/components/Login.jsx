import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {
  const [info, setInfo] = useState({
    id: "",
    pw: "",
  });

  const handlerSubmit = () => {
  }

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label name="id">ID : </label>
        <input
          type="text"
          value={info.id}
          onChange={(e) => setInfo({ ...info, id: e.target.value })}
        />
        <br/>
        <label name="pw">PW : </label>
        <input
          type="text"
          value={info.pw}
          onChange={(e) => setInfo({ ...info, pw: e.target.value })}
        />
        <br/>
        <input type="submit" value="로그인" />
      </form>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </div>
  );
};

export default Login;
