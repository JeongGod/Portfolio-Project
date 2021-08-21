import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { updateApi } from "../../api/userApi";
import { useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

const InputTag = ({ project, index, update }) => {
  return (
    <div>
      <input
        key= {`name${index}`}
        type="text"
        value={project.project_name}
        onChange={(e) => update({ ...project, project_name: e.target.value })}
      />
      <input
        key= {`detail${index}`}
        type="text"
        value={project.project_detail}
        onChange={(e) => update({ ...project, project_detail: e.target.value })}
      />
      <DatePicker
        key= {`start${index}`}
        selected={project.project_start_date}
        onChange={(date) => update({ ...project, project_start_date: date })}
        selectsStart
        startDate={project.project_start_date}
        endDate={project.project_end_date}
      />
      <DatePicker
        key= {`end${index}`}
        selected={project.project_end_date}
        onChange={(date) => update({ ...project, project_end_date: date })}
        selectsEnd
        startDate={project.project_start_date}
        endDate={project.project_end_date}
        minDate={project.project_start_date}
      />
    </div>
  );
};

const Projectss = ({data}) => {
  const [projects, setProjects] = useState(data);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector(state => state.token)

  const handlerCreate = () => {
    setProjects(
      [...projects].concat({
        project_id : `create${projects.length}`,
        project_name: "",
        project_detail: "",
        project_start_date: new Date(),
        project_end_date : new Date(),
      })
    );
  };

  const handlerSetProjects = (obj) => {
    const target = [...projects].map((project) => {
      if (project.project_id === obj.project_id) {
        project = obj
      }
      return project;
    });
    setProjects(target);
  };

  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    updateApi("projects", projects, accessToken);
  };

  const handlerDate = (date) => {
    const dateObj = new Date(date)
    return `${dateObj.getFullYear()}년 ${
      dateObj.getMonth() + 1
    }월 ${dateObj.getDate()}일`;
  };
  return (
    <IntroduceWrapper>
      <h3>프로젝트</h3>
      {edit === true ? (
        <div>
          {projects.map((project, index) => {
            return <InputTag project={project} index={index} update={handlerSetProjects} />;
          })}
          <button onClick={() => handlerCreate()}>추가</button>
          <button onClick={() => handlerSetEdit()}>edit</button>
        </div>
      ) : (
        <div>
          <ul>
          {projects.length === 0 ? (
            <p>등록 내역이 없습니다.</p>
          ) : (
            projects.map((project, index) => {
              return (
                <li key={index}>
                  <p>
                    {project.project_name}
                  </p>
                  <p>
                    {project.project_detail}
                  </p>
                  <p>{handlerDate(project.project_start_date)}</p>
                  <p>{handlerDate(project.project_end_date)}</p>
                </li>
              );
            })
          )}
          </ul>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Projectss;
