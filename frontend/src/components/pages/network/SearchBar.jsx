import React, { useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

const SearchBar = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handlerChange = (query) => {
    setSearchValue(query);
    if (query.length !== 1) {
      search(query);
    }
  }

  const handlerValid = () => {
    if (searchValue.length === 1) {
      return false;
    }
    return true;
  }
  return (
    <div className="searchWrapper">
      <InputGroup>
        <FormControl
          type="text"
          id="header-search"
          placeholder="Search user"
          onChange={(e) => handlerChange(e.target.value)}
          name="s"
          isInvalid={!handlerValid()}
        />
        <Form.Control.Feedback type="invalid">
          2글자 이상으로 검색해주세요.
        </Form.Control.Feedback>
      </InputGroup>
      
    </div>
  );
};

export default SearchBar;
