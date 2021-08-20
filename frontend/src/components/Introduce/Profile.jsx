import React from "react";
import styled from "styled-components";

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
const Profile = ({data}) => {
  return (
    <ProfileWrapper>
      {data.image === null ? (
        <img src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt = "Profile Image"/>
      ) : (
        <img src = {data.img} alt = "Profile Image" />
      )}
      <p>{data.racer_name}</p>
      <p>{data.introduce}</p>
      <button>Edit</button>
    </ProfileWrapper>
  );
};

export default Profile;
