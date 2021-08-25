import React from "react";
import { useHistory } from "react-router-dom";

import "components/pages/network/index.css";
import { Card, Button } from "react-bootstrap";
import profile_image from 'images/profile_image.png';

const Users = ({ others }) => {
  const history = useHistory();

  const handlerPage = (racer_id) => {
    history.push(`/home?id=${racer_id}`);
  };

  const UserList = () => {
    return (
      <>
      {others.map((user, index) => {
        return (
          <Card className="text-center" key={index}>
            <div className="imgWrapper">
            {!user.image ? (
              <Card.Img
                variant="top"
                src={profile_image}
                alt="user image"
              />
            ) : (
              <Card.Img
                variant="top"
                src={user.image}
                alt="user image"
              />
            ) }
            
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
      </>
    )
  }

  console.log(others);
  return (
    <div>
      {others.length !== 0 ? ( 
      <div className="userWrapper">
        <UserList />
      </div>
      ) : (
      <h3>검색 결과가 없습니다.</h3>
      )}
    </div>
  );
};

export default Users;
