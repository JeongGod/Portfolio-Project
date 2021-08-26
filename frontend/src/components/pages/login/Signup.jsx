import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { signupApi } from "api/auth";
import { Form, Button } from "react-bootstrap";
import AlertModal from "components/pages/AlertModal";


const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
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
    // 비밀번호 확인
    if (pw !== pwCheck || !isValidEmail() || !isValidPw() || !isValidName()) {
      handleModalData("회원가입 실패", "회원가입 정보를 다시 확인해주세요.");
      return;
    }
    const info = {
      id: email,
      pw: pw,
      name: name,
    };
    const response = await signupApi(info, history);
    if (response.data.result === "success") {
      history.push("/");
    } else if (response.data.result === "exist") {
      handleModalData("회원가입 실패", "이미 등록되어있는 이메일입니다.");
    } else {
      handleModalData("회원가입 실패", "Server error");
    }
  };

  const isValidEmail = () => {
    const valid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return valid.test(email);
  };
  const isValidPw = () => {
    const eng = pw.search(/[A-za-z]/g) >= 0 ? 1 : 0;
    const num = pw.search(/[0-9]/g) >= 0 ? 1 : 0;
    const spe = pw.search(/[~!@#$%^&*()_+|<>?:{}]/g) >= 0 ? 1 : 0;
    const result = eng + num + spe;

    // 공백확인
    if (pw.search(/\s/g) !== -1) return false;

    // 8글자
    if (pw.length >= 10 && result >= 2) return true;
    else if (pw.length >= 8 && result === 3) return true;

    return false;
  };
  const isValidName = () => {
    const valid = /[가-힣A-za-z]/;
    return valid.test(name);
  };

  return (
    <div className="wrapperForm">
      <h3>Racer Portfolio</h3>
      <Form onSubmit={(e) => handlerSubmit(e)}>
        <Form.Group>
          <Form.Label name="id">이메일</Form.Label>
          <Form.Control
            type="text"
            placeholder="elice@elice.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!isValidEmail()}
          />
          <Form.Control.Feedback type="invalid">
            이메일 형식으로 작성해주세요.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label name="pw">비밀번호</Form.Label>
          <Form.Control
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            isInvalid={!isValidPw()}
          />
          <Form.Control.Feedback type="invalid">
            <p> 8자 이상 영문, 숫자, 특수문자 모두 또는</p>
            <p> 10자 이상 영문, 숫자, 특수문자중 2가지를 사용하세요. </p>
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label name="pw_check">비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            value={pwCheck}
            onChange={(e) => setPwCheck(e.target.value)}
            isInvalid={!(pw === pwCheck)}
          />
          <Form.Control.Feedback type="invalid">
            비밀번호가 일치하지 않습니다.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label name="name">이름</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!isValidName()}
          />
          <Form.Control.Feedback type="invalid">
            한글 또는 영문으로만 입력해주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="info" type="submit" value="회원가입">
          회원가입
        </Button>
      </Form>

      {modalData.show && <AlertModal data={modalData} handleClose={handleClose} /> }
    </div>
  );
};
export default SignUp;
