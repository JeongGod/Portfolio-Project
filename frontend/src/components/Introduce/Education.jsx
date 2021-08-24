import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "components/Introduce/index.css";

import { deleteApi, updateApi } from "api/user";
import { useToken } from "components/CommonHook";
import { Card, Form, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { VscEdit } from 'react-icons/vsc'
import { CgAddR } from 'react-icons/cg'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaRegCheckSquare } from 'react-icons/fa'

/**
 * @param {school : 정보, update : 정보 업데이트 함수}
 * @returns
 */
const InputTag = ({ edu, index, update, remove }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">School</InputGroup.Text>
        <FormControl
          key={`name${index}`}
          type="text"
          name="name"
          value={edu.school_name}
          onChange={(e) => update({ ...edu, school_name: e.target.value })}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Major</InputGroup.Text>
        <FormControl
          key={`major${index}`}
          type="text"
          name="major"
          value={edu.major}
          onChange={(e) => update({ ...edu, major: e.target.value })}
        />
      </InputGroup>
      <Form className="edit">
      {["재학중", "학사졸업", "석사졸업", "박사졸업"].map((type) => (
        <div key={`radio-${type}`} className="mb-3">
          <Form.Check
            inline
            type="radio"
            name={`${index}`}
            id={`${index}-${type}`}
            label={`${type}`}
            checked={edu.education === type ? true : false}
            onChange={(e) => update({ ...edu, education: type })}
          />
        </div>
      ))}
      <div style={{marginLeft:"auto"}}>
        <h3>
          <RiDeleteBin5Line onClick={() => remove(edu.edu_id)}>삭제</RiDeleteBin5Line>
        </h3>
      </div>
      </Form>
      
    </div>
  );
};

const Education = ({ data, editAuth }) => {
  // useState대신 useRef를 사용해서 이벤트가 이루어졌을경우 값을 가져오는게 가능할까?
  const [edus, setEdus] = useState();
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

  useEffect(() => {
    setEdus(data)
  }, [data])

  // 정보 추가
  const handlerCreate = () => {
    setEdus(
      [...edus].concat({
        edu_id: `create${edus.length}`,
        school_name: "",
        major: "",
        education: "",
      })
    );
  };

  const handlerDelete = (targetID) => {
    setEdus([...edus].filter((edu) => edu.edu_id !== targetID));
    deleteApi("edu", targetID, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  // InputTag 컴포넌트에서 바꾼 객체를 이 함수의 인자로 가지고 온다.
  // 가지고 온 객체를 현재 state에서 교체한다.
  const handlerSetEdus = (obj) => {
    console.log(obj);
    const target = [...edus].map((edu) => {
      if (edu.edu_id === obj.edu_id) {
        edu = obj;
      }
      return edu;
    });
    setEdus(target);
  };

  const handlerSetEdit = () => {
    setEdit((prev) => !prev);
    updateApi("edus", edus, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  return (
    <Card className="introduceWrapper">
      <Card.Header>학력</Card.Header>
      {edus ? (
      <Card.Body>
        {edit ? (
          <ListGroup>
            {edus.map((edu, index) => {
              return (
                <ListGroup.Item key={index}>
                  <InputTag
                    edu={edu}
                    index={index}
                    update={handlerSetEdus}
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
              {edus.length === 0 ? (
                <Card.Title>등록 내역이 없습니다.</Card.Title>
              ) : (
                edus.map((edu, index) => {
                  return (
                    <ListGroup.Item key={index}>
                      <Card.Title>{edu.school_name}</Card.Title>
                      <Card.Text>{edu.major}</Card.Text>
                      <Card.Text>{edu.education}</Card.Text>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
            {editAuth && (
              <div className="edit">
                <h3>
                  <VscEdit onClick={() => setEdit((prev) => !prev)}>설정</VscEdit>
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

export default Education;
