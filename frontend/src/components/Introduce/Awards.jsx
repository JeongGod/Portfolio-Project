import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "components/Introduce/index.css";

import { updateApi, deleteApi } from "api/user";
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
const InputTag = ({ award, index, update, remove }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
        <FormControl
          key={`name${index}`}
          type="text"
          name="name"
          value={award.award_name}
          onChange={(e) => update({ ...award, award_name: e.target.value })}
          isInvalid={!!!award.award_name}
        />
        <Form.Control.Feedback type="invalid">
          수상 이름을 입력해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
        <FormControl
          key={`detail${index}`}
          type="text"
          name="detail"
          value={award.award_detail}
          onChange={(e) => update({ ...award, award_detail: e.target.value })}
          isInvalid={!!!award.award_detail}
        />
        <Form.Control.Feedback type="invalid">
          수상 설명을 입력해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      <div className="edit">
        <h3>
          <RiDeleteBin5Line onClick={() => remove(award.award_id)}>삭제</RiDeleteBin5Line>
        </h3>
      </div>
    </div>
  );
};

const Awards = ({ data, editAuth, handlerModal }) => {
  const [awards, setAwards] = useState();
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

  useEffect(() => {
    setAwards(data)
  }, [data])

  const handlerCreate = () => {
    setAwards(
      [...awards].concat({
        award_id: `create${awards.length}`,
        award_name: "",
        award_detail: "",
      })
    );
  };

  const handlerDelete = (targetID) => {
    setAwards([...awards].filter((award) => award.award_id !== targetID));
    deleteApi("award", targetID, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  const handlerSetAwards = (obj) => {
    const target = [...awards].map((award) => {
      if (award.award_id === obj.award_id) {
        award = obj;
      }
      return award;
    });
    setAwards(target);
  };

  const handlerSetEdit = () => {
    const isValid = awards.filter((award) => (!!!award.award_name || !!!award.award_detail))
    if (isValid.length !== 0) {
      handlerModal(true, "업데이트 실패", "빈칸을 채워주세요.");
      return;
    }

    setEdit((prev) => !prev);
    updateApi("awards", awards, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  return (
    <Card className="introduceWrapper">
      <Card.Header>수상이력</Card.Header>
      {awards ? (
      <Card.Body>
        {edit ? (
          <ListGroup className="listWrapper">
            {awards.map((award, index) => {
              return (
                <ListGroup.Item key={index}>
                  <InputTag
                    award={award}
                    index={index}
                    update={handlerSetAwards}
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
            <ListGroup className="listWrapper">
              {awards.length === 0 ? (
                <Card.Title>등록 내역이 없습니다.</Card.Title>
              ) : (
                awards.map((award, index) => {
                  return (
                    <ListGroup.Item style={{ lineHeight: "40px" }} key={index}>
                      <Card.Title>{award.award_name}</Card.Title>
                      <Card.Text>{award.award_detail}</Card.Text>
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

export default Awards;
