import axios from "axios";
import { API_BASE_URL } from "../constants";

const config = (access_token) => ({
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
});

export const getUserAll = async (setUsers, access_token) => {
  const response = await axios.get(
    `${API_BASE_URL}/user-info/all`,
    config(access_token)
  );
  const datas = response.data.other_users
  setUsers({
    others : datas,
    searchUsers : datas
  });
};
