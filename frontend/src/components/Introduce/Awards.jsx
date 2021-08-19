import React, { useState } from "react";
import styled from "styled-components";

const IntroduceWrapper = styled.div`
  width: 60vw;
  min-height: 20vh;
  margin-left: 50px;
  margin-top: 100px;
  border: 1px solid black;
`;

const Awards = () => {
  const [awards, setAwards] = useState({
    title: "",
    desc: "",
  });
  const [edit, setEdit] = useState(false);

  return (
    <IntroduceWrapper>
      <h3>수상이력</h3>
      {edit === true ? (
        <div>
          <input
            type="text"
            value={awards.title}
            onChange={(e) => setAwards({ ...awards, title: e.target.value })}
          />
          <input
            type="text"
            value={awards.desc}
            onChange={(e) => setAwards({ ...awards, desc: e.target.value })}
          />
          <button>추가</button>
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      ) : (
        <div>
          {awards.title === "" ? (
            <p>수상 내역이 없습니다.</p>
          ) : (
            <>
              <p>{awards.title}</p>
              <p>{awards.desc}</p>
            </>
          )}
          <button onClick={() => setEdit((prev) => !prev)}>edit</button>
        </div>
      )}
    </IntroduceWrapper>
  );
};

export default Awards;
