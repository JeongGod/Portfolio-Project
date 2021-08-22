import axios from "axios";
import { API_BASE_URL } from "../constants";
import { handlerExpiredToken } from "./tokenApi";

// header
const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const handlerError = async (error) => {
  // Access Token이 만료되었다면
  if (error.request.status === 401) {
    const resToken = await handlerExpiredToken();
    // Refresh Token이 만료되었다면
    if (resToken.status == 401) {
      return "expired";
    }
    return resToken;
  }
  return "error";
}

/**
 * get user info
 * @param {handler setState} setInfo
 * @param {current user id} access_token
 * @returns
 */
export const userInfoApi = async (setInfo, access_token, id=null) => {
  try {
    let response
    if(id === null) {
      response = await axios.get(
        `${API_BASE_URL}/user-info`,
        config(access_token)
      );
    } else {
      response = await axios.get(
        `${API_BASE_URL}/user-info/${id}`,
        config(access_token)
      );
    }
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
    return response;
  } catch (error) {
    return handlerError(error);
  }
};

const handlerDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
/**
 * update portfolio
 * @param {awards, edu, projects, certs} type
 * @param {} datas
 * @param {current user id} access_token
 */
export const updateApi = async (type, datas, access_token) => {
  const data = {};
  switch (type) {
    case "projects":{
      data[type] = datas.map(project => ({
          ...project,
          project_start_date : handlerDate(project.project_start_date),
          project_end_date   : handlerDate(project.project_end_date)
        })
      );
      break;
    }
    case "certs": {
      data[type] = datas.map(cert => ({
          ...cert,
          cert_achieve_date : handlerDate(cert.cert_achieve_date),
        })
      );
      break;
    }
    default : {
      data[type] = datas
      break;
    }
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/user-info/${type}`,
      data,
      config(access_token)
    );
    return response;
  } catch (error) {
    return handlerError(error);
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
    return response;
  } catch (error) {
    return handlerError(error);
  }
};

export const deleteApi = async (type, data, access_token) => {
  console.log(typeof(type),);
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/user-info/${type}/${data}`,
      config(access_token)
    );
    return response;
  } catch (error) {
    return handlerError(error);
  }
};
