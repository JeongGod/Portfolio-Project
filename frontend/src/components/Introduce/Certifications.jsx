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

const InputTag = ({ cert, index, update, remove }) => {
  return (
    <div>
      <input
        key={`name${index}`}
        type="text"
        value={cert.cert_name}
        onChange={(e) => update({ ...cert, cert_name: e.target.value })}
      />
      <input
        key={`detail${index}`}
        type="text"
        value={cert.cert_detail}
        onChange={(e) => update({ ...cert, cert_detail: e.target.value })}
      />
      <DatePicker
        key={`date${index}`}
        selected={cert.cert_achieve_date}
        onChange={(date) => update({ ...cert, cert_achieve_date: date })}
      />
      <button onClick={() => remove(cert.cert_id)}>삭제</button>
    </div>
  );
};

const Certifications = ({ data, editAuth }) => {
  const [certs, setCerts] = useState(data);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();

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
    setEdit((prev) => !prev);
    updateApi("certs", certs, accessToken).then((res) => {
      tokenHandler(res);
    });
  };

  return (
    <IntroduceWrapper>
      <h3>자격증</h3>
      {edit ? (
        <div>
          {certs.map((cert, index) => {
            return (
              <InputTag
                cert={cert}
                index={index}
                update={handlerSetCerts}
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
            {certs.length === 0 ? (
              <p>등록 내역이 없습니다.</p>
            ) : (
              certs.map((cert, index) => {
                return (
                  <li key={index}>
                    <p>{cert.cert_name}</p>
                    <p>{cert.cert_detail}</p>
                    <p>{handlerDate(cert.cert_achieve_date)} 취득</p>
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

export default Certifications;
