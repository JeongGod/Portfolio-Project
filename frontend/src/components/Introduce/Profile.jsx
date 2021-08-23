import React, { useState } from "react";
import { useSelector } from "react-redux";

import "components/Introduce/index.css";

import { patchApi } from "api/user";
import { useToken } from "components/CommonHook";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import { VscEdit } from 'react-icons/vsc'
import { FaRegCheckSquare } from 'react-icons/fa'
import { useEffect } from "react";

const Profile = ({ data, editAuth }) => {
  const { accessToken } = useSelector((state) => state.token);
  const [profile, setProfile] = useState(data);
  const [edit, setEdit] = useState(false);
  const tokenHandler = useToken();
  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    patchApi(profile, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  return (
    <Card className="text-center profileWrapper">
      {!profile.image ? (
        <img
          className="profileImage"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="Profile Image"
        />
      ) : (
        <img src={profile.img} alt="Profile Image" />
      )}
      <Card.Title>{profile.racer_name}</Card.Title>
      {edit ? (
        <>
          <InputGroup className="mb-3">
            <FormControl
              key={`detail`}
              type="text"
              name="detail"
              value={profile.introduce}
              onChange={(e) =>
                setProfile({ ...profile, introduce: e.target.value })
              }
            />
          </InputGroup>
          <div className="edit" style={{marginRight:"10px"}}>
            <h3>
              <FaRegCheckSquare onClick={() => handlerSetEdit()}>
                완료
              </FaRegCheckSquare>
            </h3>
          </div>
        </>
      ) : (
        <div>
          <Card.Text>{profile.introduce}</Card.Text>
          {editAuth && (
            <div className="edit" style={{marginRight:"10px"}}>
              <h3>
                <VscEdit onClick={() => setEdit((prev) => !prev)}>수정</VscEdit>
              </h3>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default Profile;
