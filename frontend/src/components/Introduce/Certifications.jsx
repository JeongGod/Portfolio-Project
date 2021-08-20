import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { updateApi } from "../../api/userApi";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

const InputTag = ({ cert, index, update }) => {
  return (
    <div>
      <input
        key= {`name${index}`}
        type="text"
        value={cert.cert_name}
        onChange={(e) => update({ ...cert, cert_name: e.target.value })}
      />
      <input
        key= {`detail${index}`}
        type="text"
        value={cert.cert_detail}
        onChange={(e) => update({ ...cert, cert_detail: e.target.value })}
      />
      <DatePicker
        key= {`date${index}`}
        selected={cert.cert_achieve_date}
        onChange={(date) => update({ ...cert, cert_achieve_date: date })}
      />
    </div>
  );
};

const Certifications = ({data}) => {
  const [certs, setCerts] = useState(data);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector(state => state.token)

  const handlerCreate = () => {
    setCerts(
      [...certs].concat({
        cert_id : `create${certs.length}`,
        cert_name: "",
        cert_detail: "",
        cert_achieve_date: new Date(),
      })
    );
  };

  const handlerSetCerts = (obj) => {
    const target = [...certs].map((cert) => {
      if (cert.cert_id === obj.cert_id) {
        cert = obj
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
    updateApi("certs", certs, accessToken);
  };

  return (
    <IntroduceWrapper>
      <h3>자격증</h3>
      {edit === true ? (
        <div>
          {certs.map((cert, index) => {
            return <InputTag cert={cert} index={index} update={handlerSetCerts} />;
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
                  <p>
                    {cert.cert_name}
                  </p>
                  <p>
                    {cert.cert_detail}
                  </p>
                  <p>{handlerDate(cert.achieve_date)} 취득</p>
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

export default Certifications;
