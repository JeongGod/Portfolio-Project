import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { signupApi } from "api/authApi";

const SignUp = () => {
  const history = useHistory();
  const idRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const nameRef = useRef();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 확인

    if (pwRef.current.value !== pwCheckRef.current.value) {
      alert("비밀번호가 같지 않습니다.");
      pwRef.current.value = "";
      pwCheckRef.current.value = "";
      return;
    }
    const info = {
      id: idRef.current.value,
      pw: pwRef.current.value,
      name: nameRef.current.value,
    };
    const response = await signupApi(info, history);
    if (response.data.result === "success") {
      alert("회원가입 성공");
      history.push("/home");
    } else if (response.data.result === "exist") {
      alert("이미 존재하는 ID입니다.");
    } else {
      alert("회원가입 실패");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handlerSubmit(e)}>
        <label name="id">아이디 : </label>
        <input ref={idRef} type="text" />
        <br />
        <label name="pw">비밀번호 : </label>
        <input ref={pwRef} type="password" />
        <br />
        <label name="pw_check">비밀번호 확인 : </label>
        <input ref={pwCheckRef} type="password" />
        <br />
        <label name="name">이름 : </label>
        <input ref={nameRef} type="text" />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
};

export default SignUp;
