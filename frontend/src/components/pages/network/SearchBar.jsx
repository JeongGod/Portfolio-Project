import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

const SearchBar = ({ search }) => {
  return (
    <div className="searchWrapper">
      <InputGroup>
        <FormControl
          type="text"
          id="header-search"
          placeholder="Search user"
          onChange={search}
          name="s"
        />
      </InputGroup>
    </div>
  );
};

export default SearchBar;
