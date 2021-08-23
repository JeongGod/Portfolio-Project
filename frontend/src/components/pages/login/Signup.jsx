import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { signupApi } from "api/auth";
import { Form, Button } from "react-bootstrap";

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
    <div className="wrapperForm">
      <Form onSubmit={(e) => handlerSubmit(e)}>
        <Form.Label name="id">아이디</Form.Label>
        <Form.Control ref={idRef} type="text" placeholder="elice@elice.com"/>
        <Form.Label name="pw">비밀번호</Form.Label>
        <Form.Control ref={pwRef} type="password" />
        <Form.Label name="pw_check">비밀번호 확인</Form.Label>
        <Form.Control ref={pwCheckRef} type="password" />
        <Form.Label name="name">이름</Form.Label>
        <Form.Control ref={nameRef} type="text" />
        <Button variant="info" type="submit" value="회원가입" >회원가입</Button>
      </Form>
    </div>
  );
};

export default SignUp;
