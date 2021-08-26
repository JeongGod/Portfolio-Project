import axios from "axios";
import { API_BASE_URL } from "constants/index";
import { getCookie, setCookie } from "utils/cookie";

export const signupApi = async (info) => {
  // 회원가입 API호출
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, info);
    return response;
  } catch (error) {
    console.log(error);
    return error.request;
  }
};

export const loginApi = async (info) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, info);
    setCookie("refresh_token", response.data.refresh_token, {
      path: "/",
      httponly: true,
      secure: true,
      sameSite: "none",
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const googleLoginApi = async (code) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/google/authorize`, code)
    setCookie("refresh_token", response.data.refresh_token, {
      path: "/",
      httponly: true,
      secure: true,
      sameSite: "none"
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const logoutApi = async (deleteToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`, void 0, {
      headers: {
        "Content-Type": "application/json",
        // Bearer을 붙여야 하는 이유?
        Authorization: `${getCookie("refresh_token")}`,
      },
    });
    deleteToken();
    setCookie("refresh_token", null);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};