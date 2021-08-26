import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "components/Introduce/index.css";

import { patchApi } from "api/user";
import { uploadFileToBlob } from "api/azureStorage";
import { useToken } from "components/CommonHook";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import { VscEdit } from 'react-icons/vsc'
import { FaRegCheckSquare } from 'react-icons/fa'
import profile_image from 'images/profile_image.png';

const Profile = ({ data, editAuth }) => {
  const { accessToken } = useSelector((state) => state.token);
  const [profile, setProfile] = useState();
  const [edit, setEdit] = useState(false);
  const tokenHandler = useToken();

  useEffect(() => {
    setProfile(data)
  }, [data])

  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    patchApi(profile, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  const handlerFileInput = async (e) => {
    const res = await uploadFileToBlob(e.target.files[0])
    
    setProfile({
      ...profile,
      image : res.url
    })
    
    await patchApi({...profile,image:res.url}, accessToken)

    tokenHandler(res);
    
  }

  return (
    <Card className="text-center profileWrapper">
      {profile ? (
        <>
          <div className="imgWrapper2">
          <label for="profile-image-file">
        {!profile.image ? (
            <Card.Img
              src={profile_image}
              alt="Profile Image"
            />
          
        ) : (
          <Card.Img src={profile.image} alt="Profile Image" />
        )}
        </label>
          <input type="file" accept=".jpg, .jpeg, .png" id="profile-image-file" style={{display:"none"}} onChange={e => handlerFileInput(e)}/>
          </div>
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
      </>
      ) : (
        <p>waiting..</p>
      )}
    </Card>
  );
};

export default Profile;
