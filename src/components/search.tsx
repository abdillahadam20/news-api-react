import { Input } from "antd";
import React from "react";

type SearchProps = {
  query: string;
  onQueryChange: (newQuery: string) => void;
};

const { Search: AntSearch } = Input;

const Search = ({ query, onQueryChange }: SearchProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <AntSearch
      placeholder="Search"
      value={query}
      onChange={handleChange}
      allowClear
      style={{ maxWidth: 256, height: 40 }}
    />
  );
};

export default Search;
