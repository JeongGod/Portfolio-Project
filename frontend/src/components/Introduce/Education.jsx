import React, { useEffect, useState } from "react";
import styled from "styled-components";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

/**
 * @param {school : 정보, update : 정보 업데이트 함수}
 * @returns
 */
const InputTag = ({ edu, index, update }) => {
  return (
    <div>
      <input
        key={`name${index}`}
        type="text"
        name="name"
        value={edu.school_name}
        onChange={(e) => update({ ...edu, school_name: e.target.value })}
      />
      <input
        key={`major${index}`}
        type="text"
        name="major"
        value={edu.major}
        onChange={(e) => update({ ...edu, major: e.target.value })}
      />
    </div>
  );
};

const Education = ({data}) => {
  // useState대신 useRef를 사용해서 이벤트가 이루어졌을경우 값을 가져오는게 가능할까?
  const [edus, setEdus] = useState(data);
  const [edit, setEdit] = useState(false);

  // 정보 추가
  const handlerCreate = () => {
    setEdus(
      [...edus].concat({
        edu_id : `create${edus.length}`,
        school_name: "",
        major: "",
      })
    );
  };

  // InputTag 컴포넌트에서 바꾼 객체를 이 함수의 인자로 가지고 온다.
  // 가지고 온 객체를 현재 state에서 교체한다.
  const handlerSetEdus = (obj) => {
    const target = [...edus].map((edu) => {
      if (edu.edu_id === obj.edu_id) {
        edu = obj
      }
      return edu;
    });
    setEdus(target);
  };

  return (
    <IntroduceWrapper>
      <h3>학력</h3>
      {edit === true ? (
        <div>
          {edus.map((edu, index) => {
            return <InputTag edu={edu} index={index} update={handlerSetEdus} />;
          })}

          <button onClick={() => handlerCreate()}>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          <ul>
          {edus.length === 0 ? (
            <p>등록된 내역이 없습니다.</p>
          ) : (
            edus.map((edu, index) => {
              return (
                <li key={index}>
                  <p>
                    {edu.school_name}
                  </p>
                  <p>
                    {edu.major}
                  </p>
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

export default Education;
