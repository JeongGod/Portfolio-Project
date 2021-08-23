import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import Profile from "components/Introduce/Profile";
import Education from "components/Introduce/Education";
import Awards from "components/Introduce/Awards";
import Projects from "components/Introduce/Projects";
import Certifications from "components/Introduce/Certifications";

import { userInfoApi } from "api/user";
import { useToken } from "components/CommonHook";

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
  display: table;
  float: right;
`;

const MainPage = () => {
  const { accessToken } = useSelector((state) => state.token);
  const history = useHistory();
  const location = useLocation();
  const [info, setInfo] = useState();
  const tokenHandler = useToken();

  const userParams = new URLSearchParams(location.search);
  const id = userParams.get("id");

  if (!accessToken) {
    history.replace("/login");
  }

  // url에 id가 있다면, network에서 온 것이다.
  const handlerUserInfo = async () => {
    const response = await userInfoApi(accessToken, id);

    // token이 만료되었던 친구인지 판단한다.
    if (tokenHandler(response) === "fail") {
      return;
    };

    const { user, edus, awards, projects, certificates: certs } = response.data;

    const projects_info = projects.map((project) => ({
      ...project,
      project_start_date: new Date(project.project_start_date),
      project_end_date: new Date(project.project_end_date),
    }));

    const certs_info = certs.map((cert) => ({
      ...cert,
      cert_achieve_date: new Date(cert.cert_achieve_date),
    }));
    setInfo({
      user_info: user,
      edus_info: edus,
      awards_info: awards,
      projects_info: projects_info,
      certs_info: certs_info,
    });
  };

  useEffect(() => {
    handlerUserInfo();
  }, [accessToken, id]);

  return (
    <MainWrapper>
      {!info ? (
        <p>waiting</p>
      ) : (
        <>
          <LeftWrapper>
            <Profile data={info.user_info} editAuth={!id} />
          </LeftWrapper>

          <RightWrapper>
            <Education data={info.edus_info} editAuth={!id} />
            <Awards data={info.awards_info} editAuth={!id} />
            <Projects data={info.projects_info} editAuth={!id} />
            <Certifications data={info.certs_info} editAuth={!id} />
          </RightWrapper>
        </>
      )}
    </MainWrapper>
  );
};

export default MainPage;
