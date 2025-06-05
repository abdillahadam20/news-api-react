import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-end w-full max-w-64 h-10">
      <label className="flex w-full">
        <div className="flex w-full items-center h-full rounded-lg bg-[#f0f2f4] overflow-hidden h-10">
          <div className="pl-4 text-[#637488] flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-[#f0f2f4] border-none px-4 text-[#111418] placeholder-[#637488] text-base focus:outline-none"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </label>
    </div>
  );
};

export default Search;
