import React, { useState } from "react";
import axios from 'axios';

const SignUp = () => {
  const [info, setInfo] = useState({
    id: "",
    pw: "",
    name: "",
  });

  const handlerSubmit = async () => {
    let response = await axios.post("http://localhost:")
  }

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <label name="id">아이디 : </label>
        <input
          type="text"
          value={info.id}
          onChange={(e) => setInfo({ ...info, id: e.target.value })}
        />
        <br/>
        <label name="pw">비밀번호 : </label>
        <input
          type="text"
          value={info.pw}
          onChange={(e) => setInfo({ ...info, pw: e.target.value })}
        />
        <br/>
        <label name="pw">비밀번호 확인 : </label>
        <input
          type="text"
          value={info.pw}
          onChange={(e) => setInfo({ ...info, pw: e.target.value })}
        />
        <br/>
        <label name="name">이름 : </label>
        <input
          type="text"
          value={info.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
        />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default SignUp;
