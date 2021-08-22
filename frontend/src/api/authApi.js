import axios from "axios";
import { API_BASE_URL } from "../constants";
import { getCookie, setCookie } from "../utils/cookie";

export const signupApi = async (info, history) => {
  // 회원가입 API호출
  let response = await axios.post(`${API_BASE_URL}/auth/signup`, info);
  // 확인
  if (response.data.result === "success") {
    history.replace("/login");
    alert("회원가입 성공");
  } else if (response.data.result === "exist") {
    alert("이미 회원가입이 되어있는 ID입니다.");
  } else {
    alert("회원가입 실패");
  }
};

export const loginApi = async (info, history, handleToken) => {
  let response = await axios.post(`${API_BASE_URL}/auth/login`, info);
  // 해당 객체는 객체 형태
  console.log(response)
  if (response.data.result === "success") {
    handleToken(response.data.access_token)
    setCookie("refresh_token", response.data.refresh_token, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    history.replace("/home");
  } else if (response.data.result === "no exist") {
    alert("존재하는 ID가 아닙니다.");
  } else {
    alert("아이디와 비밀번호를 확인해주세요.");
  }
};

export const logoutApi = async (deleteToken) => {
  let response = await axios.post(`${API_BASE_URL}/auth/logout`, void 0, {
    headers: {
      "Content-Type": "application/json",
      // Bearer을 붙여야 하는 이유?
      Authorization: `${getCookie("refresh_token")}`,
    },
  });
  deleteToken();
  setCookie("refresh_token", null);
};
