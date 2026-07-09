import { useState, useEffect } from "react";
import Input from "../common/Input";

const SearchBar = ({
  placeholder = "Search...",
  value = "",
  onSearch,
  delay = 500,
}) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm.trim());
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay, onSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm("");

    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <div className="search-bar">

      <Input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
      />

      {searchTerm && (
        <button
          type="button"
          className="clear-search-btn"
          onClick={handleClear}
        >
          ✕
        </button>
      )}

    </div>
  );
};

export default SearchBar;