import axios from "axios";
import { API_BASE_URL } from "../constants";

const config = (access_token) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});
export const userInfoApi = async (setInfo, access_token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user-info`,
      config(access_token)
    );
    setInfo({
      user_info: response.data.user,
      edus_info: response.data.edus,
      awards_info: response.data.awards,
      projects_info: response.data.projects,
      certs_info: response.data.certificates,
    });
    return "true";
  } catch (error) {
    console.log(error);
  }
  return;
};

export const updateApi = async (type, datas, access_token) => {
  const data = {}
  data[type] = datas
  try {
    const response = await axios.put(
      `${API_BASE_URL}/user-info/${type}`,
      data,
      config(access_token)
    );
  } catch (error) {
    console.log(error);
  }
};

export const patchApi = async (data, access_token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user-info/profile`,
      {profile: data},
      config(access_token)
    );
  } catch (error) {
    console.log(error);
  }
};