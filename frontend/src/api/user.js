import axios from "axios";
import { API_BASE_URL } from "constants/index";
import { handlerError, config } from "api/commonHandler";

/**
 * get user info
 * @param {handler setState} setInfo
 * @param {current user id} access_token
 * @returns
 */
export const userInfoApi = async (access_token, id = null) => {
  try {
    let response;
    if (!id) {
      response = await axios.get(
        `${API_BASE_URL}/api/user-info`,
        config(access_token)
      );
    } else {
      response = await axios.get(
        `${API_BASE_URL}/api/user-info/${id}`,
        config(access_token)
      );
    }
    return response;
  } catch (error) {
    console.log(error.request);
    return handlerError(error);
  }
};

const handlerDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};
/**
 * update portfolio
 * @param {awards, edu, projects, certs} type
 * @param {} datas
 * @param {current user id} access_token
 */
export const updateApi = async (type, datas, access_token) => {
  const data = {};
  switch (type) {
    case "projects": {
      data[type] = datas.map((project) => ({
        ...project,
        project_start_date: handlerDate(project.project_start_date),
        project_end_date: handlerDate(project.project_end_date),
      }));
      break;
    }
    case "certs": {
      data[type] = datas.map((cert) => ({
        ...cert,
        cert_achieve_date: handlerDate(cert.cert_achieve_date),
      }));
      break;
    }
    default: {
      data[type] = datas;
      break;
    }
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/user-info/${type}`,
      data,
      config(access_token)
    );
    return response;
  } catch (error) {
    console.log(error);
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
      `${API_BASE_URL}/api/user-info/profile`,
      { profile: data },
      config(access_token)
    );
    return response;
  } catch (error) {
    console.log(error);
    return handlerError(error);
  }
};

export const deleteApi = async (type, data, access_token) => {
  if (data.search("create") === 0) {
    return;
  }
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/user-info/${type}/${data}`,
      config(access_token)
    );
    return response;
  } catch (error) {
    console.log(error);
    return handlerError(error);
  }
};

