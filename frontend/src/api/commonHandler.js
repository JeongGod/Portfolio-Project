import { handlerExpiredToken } from "api/token";

export const config = (access_token) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

export const handlerError = async (error) => {
  // Access Token이 만료되었다면
  if (error.request.status === 401) {
    const resToken = await handlerExpiredToken();
    console.log(resToken);
    // Refresh Token이 만료되었다면
    if (resToken.status === 401) {
      return "expired";
    }
    return resToken;
  }
  return "error";
};
