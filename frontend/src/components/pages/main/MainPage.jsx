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
  let id = null;

  const [info, setInfo] = useState(null)
  
  if (accessToken === undefined) {
    history.replace("/login");
  }

  // url에 id가 있다면, network에서 온 것이다.
  useEffect(() => {
    const userParams = new URLSearchParams(location.search);
    id = userParams.get('id');
    id === null ? userInfoApi(setInfo, accessToken) : userInfoApi(setInfo, accessToken, id)
  }, [])

  return (
    <MainWrapper>
      {info === null ? (
        <p>waiting</p>
      ) : (
        <>
        <LeftWrapper>
          <Profile data={info.user_info} editAuth={id === null ? false : true}/>
        </LeftWrapper>

        <RightWrapper>
          <Education data={info.edus_info} editAuth={id === null ? false : true}/>
          <Awards data={info.awards_info} editAuth={id === null ? false : true}/>
          <Projects data={info.projects_info} editAuth={id === null ? false : true}/>
          <Certifications data={info.certs_info} editAuth={id === null ? false : true}/>
        </RightWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default MainPage;
