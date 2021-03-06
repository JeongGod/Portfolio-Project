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
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegCheckSquare } from "react-icons/fa";


const InputTag = ({ cert, index, update, remove }) => {
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          key={`name${index}`}
          type="text"
          value={cert.cert_name}
          placeholder="자격증 이름"
          onChange={(e) => update({ ...cert, cert_name: e.target.value })}
          isInvalid={!!!cert.cert_name}
        />
      <Form.Control.Feedback type="invalid">
          자격증 이름을 입력해주세요.
      </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          key={`detail${index}`}
          type="text"
          value={cert.cert_detail}
          placeholder="상세내역"
          onChange={(e) => update({ ...cert, cert_detail: e.target.value })}
          isInvalid={!!!cert.cert_detail}
        />
        <Form.Control.Feedback type="invalid">
          상세내역을 입력해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      <InputGroup className="mb-3">
        <div style={{ flex: 1 }}>
          <DatePicker
            className="form-control"
            key={`date${index}`}
            selected={cert.cert_achieve_date}
            dateFormat="yyyy-MM-dd"
            onChange={(date) => update({ ...cert, cert_achieve_date: date })}
          />
        </div>
      </InputGroup>
      <div className="edit">
        <h3>
          <RiDeleteBin5Line onClick={() => remove(cert.cert_id)}>
            삭제
          </RiDeleteBin5Line>
        </h3>
      </div>
    </div>
  );
};

const Certifications = ({ data, editAuth, handlerModal }) => {
  const [certs, setCerts] = useState();
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

  useEffect(() => {
    setCerts(data)
  }, [data])

  const handlerCreate = () => {
    setCerts(
      [...certs].concat({
        cert_id: `create${certs.length}`,
        cert_name: "",
        cert_detail: "",
        cert_achieve_date: new Date(),
      })
    );
  };

  const handlerDelete = (targetID) => {
    setCerts([...certs].filter((cert) => cert.cert_id !== targetID));
    deleteApi("cert", targetID, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  const handlerSetCerts = (obj) => {
    const target = [...certs].map((cert) => {
      if (cert.cert_id === obj.cert_id) {
        cert = obj;
      }
      return cert;
    });
    setCerts(target);
  };

  const handlerDate = (date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const handlerSetEdit = () => {
    const isValid = certs.filter((cert) => (!!!cert.cert_name || !!!cert.cert_detail))
    if (isValid.length !== 0) {
      handlerModal(true, "업데이트 실패", "빈칸을 채워주세요.");
      return;
    }

    setEdit((prev) => !prev);
    updateApi("certs", certs, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  return (
    <Card className="introduceWrapper" style={{marginBottom: "200px"}}>
      <Card.Header>자격증</Card.Header>
      {certs ? (
      <Card.Body>
        {edit ? (
          <ListGroup>
            {certs.map((cert, index) => {
              return (
                <ListGroup.Item key={index}>
                  <InputTag
                    cert={cert}
                    index={index}
                    update={handlerSetCerts}
                    remove={handlerDelete}
                  />
                </ListGroup.Item>
              );
            })}
            <div className="edit">
              <h3>
                <CgAddR onClick={() => handlerCreate()}>추가</CgAddR>
                <FaRegCheckSquare onClick={() => handlerSetEdit()}>
                  완료
                </FaRegCheckSquare>
              </h3>
            </div>
          </ListGroup>
        ) : (
          <div>
            <ListGroup>
              {certs.length === 0 ? (
                <Card.Title>등록 내역이 없습니다.</Card.Title>
              ) : (
                certs.map((cert, index) => {
                  return (
                    <ListGroup.Item className="liststyle" key={index}>
                      <Card.Title>{cert.cert_name}</Card.Title>
                      <Card.Text>{cert.cert_detail}</Card.Text>
                      <Card.Text>
                        {handlerDate(cert.cert_achieve_date)} 취득
                      </Card.Text>
                    </ListGroup.Item>
                  );
                })
              )}
            </ListGroup>
            {editAuth && (
              <div className="edit">
                <h3>
                  <VscEdit onClick={() => setEdit((prev) => !prev)}></VscEdit>
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

export default Certifications;
