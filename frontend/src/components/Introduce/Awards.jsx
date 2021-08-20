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
const InputTag = ({ award, index, update }) => {
  return (
    <div>
      <input
        key={`name${index}`}
        type="text"
        name="name"
        value={award.award_name}
        onChange={(e) => update({ ...award, award_name: e.target.value })}
      />
      <input
        key={`detail${index}`}
        type="text"
        name="detail"
        value={award.award_detail}
        onChange={(e) => update({ ...award, award_detail: e.target.value })}
      />
    </div>
  );
};

const Awards = ({data}) => {
  const [awards, setAwards] = useState(data)
  const [edit, setEdit] = useState(false);
  

  const handlerCreate = () => {
    setAwards(
      [...awards].concat({
        award_id : `create${awards.length}`,
        award_name: "",
        award_detail: "",
      })
    );
  };

  const handlerSetAwards = (obj) => {
    const target = [...awards].map((award) => {
      if (award.award_id === obj.award_id) {
        award = obj
      }
      return award;
    });
    setAwards(target);
  };


  return (
    <IntroduceWrapper>
      <h3>수상이력</h3>
      {edit === true ? (
        <div>
          {awards.map((award, index) => {
            return <InputTag award={award} index={index} update={handlerSetAwards} />;
          })}

          <button onClick={() => handlerCreate()}>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          <ul>
          {awards.length === 0 ? (
            <p>등록 내역이 없습니다.</p>
          ) : (
            
            awards.map((award, index) => {
              return (
                  <li key={index}>
                    <p>
                      {award.award_name}
                    </p>
                    <p>
                      {award.award_detail}
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

export default Awards;
