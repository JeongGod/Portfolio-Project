import React from "react";
import { useHistory } from "react-router-dom";

import "components/pages/network/index.css";
import { Card, Button } from "react-bootstrap";

const Users = ({ others }) => {
  const history = useHistory();

  const handlerPage = (racer_id) => {
    history.push(`/home?id=${racer_id}`);
  };

  return (
    <div className="userWrapper">
      {others.map((user, index) => {
        return (
          <Card className="text-center" key={index}>
            <div className="imgWrapper">
            <Card.Img
              variant="top"
              src="https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg"
              alt="user image"
            />
            </div>
            <Card.Title>{user.racer_name}</Card.Title>
            <Card.Text>{user.introduce}</Card.Text>
            <Button
              variant="primary"
              onClick={() => handlerPage(user.racer_id)}
            >
              정보보기
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default Users;
