import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import "components/Introduce/index.css";
import "react-datepicker/dist/react-datepicker.css";

import { updateApi, deleteApi } from "api/user";
import { useToken } from "components/CommonHook";
import { Card, Form, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { VscEdit } from "react-icons/vsc";
import { CgAddR } from "react-icons/cg";
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegCheckSquare } from 'react-icons/fa'

const InputTag = ({ project, index, update, remove }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          key={`name${index}`}
          type="text"
          value={project.project_name}
          placeholder="프로젝트 이름"
          onChange={(e) => update({ ...project, project_name: e.target.value })}
          isInvalid={!!!project.project_name}
        />
        <Form.Control.Feedback type="invalid">
          프로젝트 이름을 입력해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          key={`detail${index}`}
          type="text"
          value={project.project_detail}
          placeholder="상세설명"
          onChange={(e) =>
            update({ ...project, project_detail: e.target.value })
          }
          isInvalid={!!!project.project_detail}
        />
        <Form.Control.Feedback type="invalid">
          상세설명을 입력해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
        <div style={{ flex: 1 }}>
          <DatePicker
            className="form-control"
            key={`start${index}`}
            selected={project.project_start_date}
            dateFormat="yyyy-MM-dd"
            onChange={(date) =>
              update({ ...project, project_start_date: date })
            }
            selectsStart
            startDate={project.project_start_date}
            endDate={project.project_end_date}
          />
        </div>
        <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
        <div style={{ flex: 1 }}>
      <DatePicker
      className="form-control"
        key={`end${index}`}
        selected={project.project_end_date}
        dateFormat="yyyy-MM-dd"
        onChange={(date) => update({ ...project, project_end_date: date })}
        selectsEnd
        startDate={project.project_start_date}
        endDate={project.project_end_date}
        minDate={project.project_start_date}
      />
      </div>
      </InputGroup>
      <div className="edit">
        <h3>
          <RiDeleteBin5Line onClick={() => remove(project.project_id)}>삭제</RiDeleteBin5Line>
        </h3>
      </div>
    </div>
  );
};

const Projectss = ({ data, editAuth, handlerModal }) => {
  const [projects, setProjects] = useState();
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

  useEffect(() => {
    setProjects(data)
  }, [data])

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
    const isValid = projects.filter((project) => (!!!project.project_name || !!!project.project_detail))
    if (isValid.length !== 0) {
      handlerModal(true, "업데이트 실패", "빈칸을 채워주세요.");
      return;
    }

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
    <Card className="introduceWrapper">
      <Card.Header>프로젝트</Card.Header>
      {projects ? (
      <Card.Body>
        {edit ? (
          <ListGroup>
            {projects.map((project, index) => {
              return (
                <ListGroup.Item key={index}>
                  <InputTag
                    project={project}
                    index={index}
                    update={handlerSetProjects}
                    remove={handlerDelete}
                  />
                </ListGroup.Item>
              );
            })}
            <div className="edit">
              <h3>
                <CgAddR onClick={() => handlerCreate()}>추가</CgAddR>
                <FaRegCheckSquare onClick={() => handlerSetEdit()}>완료</FaRegCheckSquare>
              </h3>
            </div>
          </ListGroup>
        ) : (
          <div>
            <ListGroup>
              {projects.length === 0 ? (
                <Card.Title>등록 내역이 없습니다.</Card.Title>
              ) : (
                projects.map((project, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Card.Title>{project.project_name}</Card.Title>
                      <Card.Text>{project.project_detail}</Card.Text>
                      <Card.Text>
                        {handlerDate(project.project_start_date)} ~ {handlerDate(project.project_end_date)}
                      </Card.Text>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
            {editAuth && (
              <div className="edit">
                <h3>
                  <VscEdit onClick={() => setEdit((prev) => !prev)}>수정</VscEdit>
                </h3>
              </div>
            )}
          </div>
        )}
      </Card.Body>
      ) : (
        <p>waiting..</p>
      )}
    </Card>
  );
};

export default Projectss;
