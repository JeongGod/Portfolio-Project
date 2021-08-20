import styled from "styled-components";
import Profile from "../../Introduce/Profile";
import Education from "../../Introduce/Education";
import Awards from "../../Introduce/Awards";
import Projects from "../../Introduce/Projects";
import Certifications from "../../Introduce/Certifications";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { userInfoApi } from "../../../api/userApi";

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
  const { accessToken } = useSelector(state => state.token)
  const history = useHistory();
  const [info, setInfo] = useState(null)
  if (accessToken === undefined) {
    history.replace("/login");
  }
  useEffect(() => {
    userInfoApi(setInfo, accessToken);
  }, [accessToken])

  return (
    <MainWrapper>
      {info === null ? (
        <p>waiting</p>
      ) : (
        <>
        <LeftWrapper>
          <Profile data={info.user_info}/>
        </LeftWrapper>

        <RightWrapper>
          <Education data={info.edus_info}/>
          <Awards data={info.awards_info}/>
          <Projects data={info.projects_info}/>
          <Certifications data={info.certs_info}/>
        </RightWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default MainPage;
