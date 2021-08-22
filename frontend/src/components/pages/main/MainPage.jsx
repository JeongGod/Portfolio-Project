import styled from "styled-components";
import Profile from "../../Introduce/Profile";
import Education from "../../Introduce/Education";
import Awards from "../../Introduce/Awards";
import Projects from "../../Introduce/Projects";
import Certifications from "../../Introduce/Certifications";
import { useHistory, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [info, setInfo] = useState(null)

  const userParams = new URLSearchParams(location.search);
  const id = userParams.get('id');
  
  if (accessToken === undefined) {
    history.replace("/login");
  }
  
  // url에 id가 있다면, network에서 온 것이다.
  useEffect(() => {
    id === null ? userInfoApi(setInfo, accessToken) : userInfoApi(setInfo, accessToken, id)
  }, [])

  return (
    <MainWrapper>
      {info === null ? (
        <p>waiting</p>
      ) : (
        <>
        <LeftWrapper>
          <Profile data={info.user_info} editAuth={id === null ? true : false}/>
        </LeftWrapper>

        <RightWrapper>
          <Education data={info.edus_info} editAuth={id === null ? true : false}/>
          <Awards data={info.awards_info} editAuth={id === null ? true : false}/>
          <Projects data={info.projects_info} editAuth={id === null ? true : false}/>
          <Certifications data={info.certs_info} editAuth={id === null ? true : false}/>
        </RightWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default MainPage;
