import axios from "axios";
import { API_BASE_URL } from "../constants";

export const userInfoApi = async (setInfo, access_token) => {
  console.log(access_token);
  try {
    const response = await axios.get(`${API_BASE_URL}/user-info`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    setInfo({
      user_info     : response.data.user,
      edus_info     : response.data.edus,
      awards_info   : response.data.awards,
      projects_info : response.data.projects,
      certs_info    : response.data.certificates,
    })
    return "true"
  } catch (error) {
    console.log(error);
  }
  return;
}