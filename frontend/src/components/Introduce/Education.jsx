import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { deleteApi, updateApi } from "api/userApi";
import { useToken } from "components/CommonHook";

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
const InputTag = ({ edu, index, update, remove }) => {
  return (
    <div>
      <input
        key={`name${index}`}
        type="text"
        name="name"
        value={edu.school_name}
        onChange={(e) => update({ ...edu, school_name: e.target.value })}
      />
      <br />
      <input
        key={`major${index}`}
        type="text"
        name="major"
        value={edu.major}
        onChange={(e) => update({ ...edu, major: e.target.value })}
      />
      <br />
      <label key={`education1${index}`}>
        <input
          type="radio"
          name={`${index}`}
          value="재학중"
          checked={edu.education === "재학중" ? true : false}
          onChange={(e) => update({ ...edu, education: e.target.value })}
        ></input>
        재학중
      </label>

      <label key={`education2${index}`}>
        <input
          type="radio"
          name={`${index}`}
          value="학사졸업"
          checked={edu.education === "학사졸업" ? true : false}
          onChange={(e) => update({ ...edu, education: e.target.value })}
        ></input>
        학사졸업
      </label>
      <label htmlFor="education" key={`education3${index}`}>
        <input
          type="radio"
          name={`${index}`}
          value="석사졸업"
          checked={edu.education === "석사졸업" ? true : false}
          onChange={(e) => update({ ...edu, education: e.target.value })}
        ></input>
        석사졸업
      </label>
      <label htmlFor="education" key={`education4${index}`}>
        <input
          type="radio"
          name={`${index}`}
          value="박사졸업"
          checked={edu.education === "박사졸업" ? true : false}
          onChange={(e) => update({ ...edu, education: e.target.value })}
        ></input>
        박사졸업
      </label>
      <button onClick={() => remove(edu.edu_id)}>삭제</button>
    </div>
  );
};

const Education = ({ data, editAuth }) => {
  // useState대신 useRef를 사용해서 이벤트가 이루어졌을경우 값을 가져오는게 가능할까?
  const [edus, setEdus] = useState(data);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useSelector((state) => state.token);
  const tokenHandler = useToken();
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
    <IntroduceWrapper>
      <h3>학력</h3>
      {edit ? (
        <div>
          {edus.map((edu, index) => {
            return (
              <InputTag
                edu={edu}
                index={index}
                update={handlerSetEdus}
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
            {edus.length === 0 ? (
              <p>등록된 내역이 없습니다.</p>
            ) : (
              edus.map((edu, index) => {
                return (
                  <li key={index}>
                    <p>{edu.school_name}</p>
                    <p>{edu.major}</p>
                    <p>{edu.education}</p>
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

export default Education;
