import React, { useState } from "react";

const SearchBar = ({ search }) => {

  return (
    <form>
      <label htmlFor="header-search">
        <span>Search User</span>
      </label>
      <input
        type="text"
        id="header-search"
        placeholder="Search user"
        onChange={search}
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
