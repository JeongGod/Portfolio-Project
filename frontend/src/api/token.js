import axios from "axios";
import { API_BASE_URL } from "constants/index";
import { getCookie } from "utils/cookie";
import { config } from "api/commonHandler";

/**
 * Refresh Token을 이용하여 새로운 Access Token을 발급한다
 * 만약, Refresh Token이 만료되었다면 로그인을 다시 진행한다
 */
export const handlerExpiredToken = async () => {
  console.log(getCookie("refresh_token"));
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh`,
      void 0,
      config(getCookie("refresh_token"))
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.request;
  }
};
