import React, { useState } from "react";
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
const InputTag = ({ school, update }) => {
  return (
    <div>
      <input
        type="text"
        name="name"
        value={school.name}
        onChange={(e) => update({ ...school, name: e.target.value })}
      />
      <input
        type="text"
        name="major"
        value={school.major}
        onChange={(e) => update({ ...school, major: e.target.value })}
      />
    </div>
  );
};

const Education = () => {
  // useState대신 useRef를 사용해서 이벤트가 이루어졌을경우 값을 가져오는게 가능할까?
  const [schools, setSchools] = useState([
    {
      id: 0,
      name: "엘리스 학교",
      major: "컴퓨터공학과",
    },
    {
      id: 1,
      name: "우아아아",
      major: "공돌이",
    },
  ]);
  const [edit, setEdit] = useState(false);

  // 정보 추가
  const handlerCreate = () => {
    setSchools(
      [...schools].concat({
        id: 2,
        name: "",
        major: "",
      })
    );
  };

  // InputTag 컴포넌트에서 바꾼 객체를 이 함수의 인자로 가지고 온다.
  // 가지고 온 객체를 현재 state에서 교체한다.
  const handlersetSchools = (obj) => {
    const target = [...schools].map((school) => {
      if (school.id === obj.id) {
        school.name = obj.name;
        school.major = obj.major;
      }
      return school;
    });
    setSchools(target);
  };

  return (
    <IntroduceWrapper>
      <h3>학력</h3>
      {edit === true ? (
        <div>
          {schools.map((school) => {
            return <InputTag school={school} update={handlersetSchools} />;
          })}

          <button onClick={() => handlerCreate()}>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          {schools.map((school) => {
            return (
              <div>
                <p>
                  {school.name === "" ? "학교 이름을 적어주세요" : school.name}
                </p>
                <p>
                  {school.major === "" ? "전공을 적어주세요" : school.major}
                </p>
              </div>
            );
          })}
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Education;
