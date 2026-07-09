import { useState, useEffect } from "react";
import Input from "../common/Input";

const TransactionFilter = ({
  categories = [],
  onFilterChange,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
  });

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      type: "all",
      category: "all",
    });
  };

  return (
    <div className="transaction-filter">

      <div className="filter-group">

        <Input
          type="text"
          name="search"
          placeholder="Search by description..."
          value={filters.search}
          onChange={handleChange}
        />

      </div>

      <div className="filter-group">

        <label>Type</label>

        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
        >
          <option value="all">
            All
          </option>

          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

      </div>

      <div className="filter-group">

        <label>Category</label>

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="all">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}

        </select>

      </div>

      <button
        className="reset-filter-btn"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>
  );
};

export default TransactionFilter;