import axios from "axios";
import { API_BASE_URL } from "constants/index";
import { handlerError, config } from "api/commonHandler";
/**
 *
 * @param {handler setState} setUsers
 * @param {} access_token
 * @returns
 */
export const getUserAll = async (access_token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user-info/all`,
      config(access_token)
    );
    return response;
  } catch (error) {
    console.log(error);
    return handlerError(error);
  }
};
