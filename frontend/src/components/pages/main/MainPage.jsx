import styled from "styled-components";
import Profile from "../../Introduce/Profile";
import Introduce from "../../Introduce/Introduce";
import { useHistory } from "react-router-dom";

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
  const accessToken = localStorage.getItem('access_token')
  const history = useHistory();

  if(accessToken === "null"){
    history.replace('/login')
  }

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
