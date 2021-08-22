import React, { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";
import { updateApi, deleteApi } from "api/userApi";
import { useToken } from "components/CommonHook";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

const InputTag = ({ project, index, update, remove }) => {
  return (
    <div>
      <input
        key={`name${index}`}
        type="text"
        value={project.project_name}
        onChange={(e) => update({ ...project, project_name: e.target.value })}
      />
      <input
        key={`detail${index}`}
        type="text"
        value={project.project_detail}
        onChange={(e) => update({ ...project, project_detail: e.target.value })}
      />
      <DatePicker
        key={`start${index}`}
        selected={project.project_start_date}
        onChange={(date) => update({ ...project, project_start_date: date })}
        selectsStart
        startDate={project.project_start_date}
        endDate={project.project_end_date}
      />
      <DatePicker
        key={`end${index}`}
        selected={project.project_end_date}
        onChange={(date) => update({ ...project, project_end_date: date })}
        selectsEnd
        startDate={project.project_start_date}
        endDate={project.project_end_date}
        minDate={project.project_start_date}
      />
      <button onClick={() => remove(project.project_id)}>삭제</button>
    </div>
  );
};

const Projectss = ({ data, editAuth }) => {
  const [projects, setProjects] = useState(data);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

  const handlerCreate = () => {
    setProjects(
      [...projects].concat({
        project_id: `create${projects.length}`,
        project_name: "",
        project_detail: "",
        project_start_date: new Date(),
        project_end_date: new Date(),
      })
    );
  };

  const handlerDelete = (targetID) => {
    setProjects(
      [...projects].filter((project) => project.project_id !== targetID)
    );
    deleteApi("project", targetID, accessToken).then((res) => {
      tokenHandler();
    });
  };

  const handlerSetProjects = (obj) => {
    const target = [...projects].map((project) => {
      if (project.project_id === obj.project_id) {
        project = obj;
      }
      return project;
    });
    setProjects(target);
  };

  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    updateApi("projects", projects, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  const handlerDate = (date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };
  return (
    <IntroduceWrapper>
      <h3>프로젝트</h3>
      {edit ? (
        <div>
          {projects.map((project, index) => {
            return (
              <InputTag
                project={project}
                index={index}
                update={handlerSetProjects}
                remove={handlerDelete}
              />
            );
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
                    <p>{project.project_name}</p>
                    <p>{project.project_detail}</p>
                    <p>{handlerDate(project.project_start_date)}</p>
                    <p>{handlerDate(project.project_end_date)}</p>
                  </li>
                );
              })
            )}
          </ul>
          {editAuth && (
            <button onClick={() => setEdit((prev) => !prev)}>edit</button>
          )}
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Projectss;
