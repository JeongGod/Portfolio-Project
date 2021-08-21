import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserAll } from "../../../api/searchApi";
import SearchBar from "./SearchBar";
import Users from "./Users";
const NetworkPage = () => {
  const { accessToken } = useSelector((state) => state.token);
  const [datas, setDatas] = useState({
    others : null,
    searchUsers : null
  });

  useEffect(() => {
    getUserAll(setDatas, accessToken);
  }, []);

  const handlerSearch = (e) => {
    const query = e.target.value;
    if (!query) {
      setDatas({...datas, others:datas.searchUsers})
      return;
    }
    console.log(datas);
    const filteredUsers = datas.searchUsers.filter(user => {
      return user.racer_id.includes(query) || user.racer_name.includes(query)
    });
    setDatas({...datas, others: filteredUsers})
  };

  return (
    <div>
      <SearchBar search={handlerSearch} />
      {datas.others === null ? <p>loading</p> : <Users others={datas.others} />}
    </div>
  );
};

export default NetworkPage;
