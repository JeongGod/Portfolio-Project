import React, { useState } from "react";
import styled from "styled-components";
import { patchApi } from "../../api/userApi";
import { useSelector } from "react-redux";

const ProfileWrapper = styled.div`
  position: sticky;
  text-align: center;
  width: 300px;
  height: 300px;
  border: 1px solid black;
  top: 200px;
  left: 70px;

  img {
    width: 90px;
    height: 90px;
  }
`;


const Profile = ({data, editAuth}) => {
  const { accessToken } = useSelector(state => state.token)
  const [profile, setProfile] = useState(data)
  const [edit, setEdit] = useState(false);

  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    patchApi(profile, accessToken);
  };

  return (
    <ProfileWrapper>
      {profile.image === null ? (
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="Profile Image"
        />
      ) : (
        <img src={profile.img} alt="Profile Image" />
      )}
      <p>{profile.racer_name}</p>
      {edit === true ? (
        <div>
        <input
          key={`detail`}
          type="text"
          name="detail"
          value={profile.introduce}
          onChange={(e) =>
            setProfile({ ...profile, introduce: e.target.value })
          }
        /><br/>
        <button onClick={() => handlerSetEdit()}>edit</button>
      </div>
        
      ) : (
        <div>
        <p>{profile.introduce}</p>
        {editAuth && 
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        }
        </div>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
