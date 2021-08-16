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

const Certifications = () => {
  const [cert, setCert] = useState({
    title: "",
    origin: "",
    achieveDate: new Date(),
  });
  const [edit, setEdit] = useState(false);

  const handlerDate = (date) => {
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  return (
    <IntroduceWrapper>
      <h3>자격증</h3>
      {edit === true ? (
        <div>
          <input
            type="text"
            value={cert.title}
            onChange={(e) => setCert({ ...cert, title: e.target.value })}
          />
          <input
            type="text"
            value={cert.origin}
            onChange={(e) => setCert({ ...cert, origin: e.target.value })}
          />
          <DatePicker
            selected={cert.achieveDate}
            onChange={(date) => setCert({ ...cert, achieveDate: date })}
          />
          <button>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          {cert.title === "" ? (
            <p>수상 내역이 없습니다.</p>
          ) : (
            <>
              <p>{cert.title}</p>
              <p>{cert.origin}</p>
              <p>{handlerDate(cert.achieveDate)} 취득</p>
            </>
          )}
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Certifications;
