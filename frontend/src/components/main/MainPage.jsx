import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import Introduce from "./Introduce/Introduce";

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const LeftWrapper = styled.div`
  width: 30vw;
  height: 100vh;
  float: left;
`;
const RightWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  float: right;
`;

const MainPage = () => {
  return (
    <MainWrapper>
      <LeftWrapper>
        <Profile />
      </LeftWrapper>

      <RightWrapper>
        <Introduce />
      </RightWrapper>
    </MainWrapper>
  );
};

export default MainPage;
