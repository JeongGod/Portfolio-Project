import axios from "axios";

export const signupApi = async (info) => {
  // 회원가입 API호출
  let response = await axios.post("http://localhost:5000/signup", {
    id: info.id,
    pw: info.pw,
    name: info.name,
  });
  // 확인
  if (response.data.result === "success") {
    alert("회원가입 성공");
  } else if (response.data.result === "exist") {
    alert("이미 회원가입이 되어있는 ID입니다.");
  } else {
    alert("회원가입 실패");
  }
};

export const loginApi = async (info) => {
  let response = await axios.post("http://localhost:5000/login", {
    id: info.id,
    pw: info.pw,
  });
};
