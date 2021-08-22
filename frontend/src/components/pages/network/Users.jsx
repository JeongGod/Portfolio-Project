import React from "react";
import { useHistory } from "react-router-dom";

const Users = ({ others }) => {
  const history = useHistory();

  const handlerPage = (racer_id) => {
    history.push(`/home?id=${racer_id}`);
  };

  return (
    <div>
      {others.map((user, index) => {
        return (
          <div key={index} onClick={() => handlerPage(user.racer_id)}>
            <img
              src="https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg"
              alt="user image"
            />
            <p>
              {user.racer_id} {user.racer_name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
