import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { signupApi } from "../../../api/authApi";

const SignUp = () => {
  const history = useHistory();
  const [info, setInfo] = useState({
    id: "",
    pw: "",
    pw_check: "",
    name: "",
  });

  const handlerSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 확인
    if (info.pw !== info.pw_check) {
      alert("비밀번호가 같지 않습니다.");
      setInfo({ ...info, pw: "", pw_check: "" });
      return;
    }
    signupApi(info, history);
  };

  return (
    <div>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label name="id">아이디 : </label>
        <input
          type="text"
          value={info.id}
          onChange={(e) => setInfo({ ...info, id: e.target.value })}
        />
        <br />
        <label name="pw">비밀번호 : </label>
        <input
          type="password"
          value={info.pw}
          onChange={(e) => setInfo({ ...info, pw: e.target.value })}
        />
        <br />
        <label name="pw_check">비밀번호 확인 : </label>
        <input
          type="password"
          value={info.pw_check}
          onChange={(e) => setInfo({ ...info, pw_check: e.target.value })}
        />
        <br />
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
