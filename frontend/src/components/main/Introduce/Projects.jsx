import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

const Projects = () => {
  const [project, setProject] = useState({
    title: "",
    desc: "",
    startDate: new Date(),
    endDate: new Date(),
  });
  const [edit, setEdit] = useState(false);

  const handlerDate = (date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <IntroduceWrapper>
      <h3>프로젝트</h3>
      {edit === true ? (
        <div>
          <input
            type="text"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />
          <input
            type="text"
            value={project.desc}
            onChange={(e) => setProject({ ...project, desc: e.target.value })}
          />
          <DatePicker
            selected={project.startDate}
            onChange={(date) => setProject({ ...project, startDate: date })}
            selectsStart
            startDate={project.startDate}
            endDate={project.endDate}
          />
          <DatePicker
            selected={project.endDate}
            onChange={(date) => setProject({ ...project, endDate: date })}
            selectsEnd
            startDate={project.startDate}
            endDate={project.endDate}
            minDate={project.startDate}
          />
          <button>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          {project.title === "" ? (
            <p>프로젝트 내역이 없습니다.</p>
          ) : (
            <>
              <p>{project.title}</p>
              <p>{project.desc}</p>
              <p>
                {handlerDate(project.startDate)} ~{" "}
                {handlerDate(project.endDate)}
              </p>
            </>
          )}
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Projects;
