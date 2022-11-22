import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import categoryList from "./DropdownCategoryList.js";

function ClubSearch(props) {
  const nav = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    nav(
      "/clubs/?search=" +
        searchInput +
        "&location=" +
        searchLocation +
        "&category=" +
        category
    );

    //reset search input fields
    setSearchInput("");
    setSearchLocation("");
    setCategory("");
  }

  return (
    <div className="ClubSearch pt-2">
      <form role="search" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="search"
          placeholder="Search for a club"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <input
          className="form-control"
          type="search"
          placeholder="Location"
          aria-label="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        {/* <div className="mt-3">
          <label htmlFor="floatingSelect">Choose a category</label>
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Choose category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option className="" defaultValue>
              Choose a category
            </option>
            <option data-tokens="1">biography</option>
            <option data-tokens="2">casual</option>
            <option data-tokens="3">childrens literature</option>
            <option data-tokens="4">classics</option>
            <option data-tokens="5">historical fiction</option>
            <option data-tokens="6">sci-fi</option>
            <option data-tokens="7">travel</option>
          </select>
        </div> */}

        <div className="mb-3 dropdown">
          <select
            className="form-select"
            id="floatingSelect"
            name="category"
            aria-label="Choose category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option defaultValue>Choose a category</option>
            {categoryList.map((c) => (
              <option className="dropdown-item" key={c} value={c}>
                {c}
              </option>
            ))}
            ;
          </select>
        </div>

        <button className="btn btn-outline-secondary mt-3" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default ClubSearch;
