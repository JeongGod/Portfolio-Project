import axios from "axios";
import { API_BASE_URL } from "../constants";

const config = (access_token) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

/**
 * get user info
 * @param {handler setState} setInfo
 * @param {current user id} access_token
 * @returns
 */
export const userInfoApi = async (setInfo, access_token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user-info`,
      config(access_token)
    );

    const projects_info = response.data.projects;
    projects_info.map(project => {
      project.project_start_date = new Date(project.project_start_date)
      project.project_end_date   = new Date(project.project_end_date)
    });

    const certs_info = response.data.certificates;
    certs_info.map(cert => cert.cert_achieve_date = new Date(cert.cert_achieve_date))
    setInfo({
      user_info: response.data.user,
      edus_info: response.data.edus,
      awards_info: response.data.awards,
      projects_info: projects_info,
      certs_info: certs_info,
    });
    return "true";
  } catch (error) {
    console.log(error);
  }
  return;
};
/**
 * update portfolio
 * @param {awards, edu, projects, certs} type
 * @param {} datas
 * @param {current user id} access_token
 */
export const updateApi = async (type, datas, access_token) => {
  const data = {};
  data[type] = datas;
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

/**
 * update profile
 * @param {} data
 * @param {current user id} access_token
 */
export const patchApi = async (data, access_token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user-info/profile`,
      { profile: data },
      config(access_token)
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteApi = async (type, data, access_token) => {
  console.log(typeof(type), typeof(data));
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user-info/${type}/${data}`,
      config(access_token)
    );
  } catch (error) {
    console.log(error);
  }
};
