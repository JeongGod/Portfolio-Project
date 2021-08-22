import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchBar from "components/pages/network/SearchBar";
import Users from "components/pages/network/Users";

import { getUserAll } from "api/searchApi";
import { useToken } from "components/CommonHook";

const NetworkPage = () => {
  const { accessToken } = useSelector((state) => state.token);
  const [users, setUsers] = useState({
    others: null,
    searchUsers: null,
  });
  const tokenHandler = useToken();

  useEffect(() => {
    const handler = async () => {
      const response = await getUserAll(accessToken);
      // token이 만료되었는지 판단
      tokenHandler(response);

      const { other_users } = response.data;
      setUsers({
        others: other_users,
        searchUsers: other_users,
      });
    };
    handler();
  }, []);

  const handlerSearch = (e) => {
    const query = e.target.value;
    if (!query) {
      setUsers({ ...users, others: users.searchUsers });
      return;
    }

    const filteredUsers = users.searchUsers.filter((user) => {
      return user.racer_id.includes(query) || user.racer_name.includes(query);
    });
    setUsers({ ...users, others: filteredUsers });
  };

  return (
    <div>
      <SearchBar search={handlerSearch} />
      {!users.others ? <p>loading</p> : <Users others={users.others} />}
    </div>
  );
};

export default NetworkPage;
