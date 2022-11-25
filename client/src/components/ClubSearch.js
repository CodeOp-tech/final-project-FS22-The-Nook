import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryList from "./DropdownCategoryList.js";
import "./ClubSearch.scss"

function ClubSearch(props) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    changeUrl();
    }, [searchInput, searchLocation, category])


    function changeUrl(){

      navigate(`/clubs/?search=${searchInput}&location=${searchLocation}&category=${category}`)
      props.getClubs && props.getClubs()
      
    }


  return (
    <div className="ClubSearch pt-2">
      <h3>Search for a club</h3>
      <form role="search">
        <input
          className="form-control mb-2"
          type="search"
          placeholder="By Name"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="search"
          placeholder="By Location"
          aria-label="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />

        <div className="mb-3 dropdown">
          <select
            className="form-select"
            id="floatingSelect"
            name="category"
            aria-label="Choose category"
            value={category}
            onChange={(e) => e.target.value === "By Category" ? setCategory("") : setCategory(e.target.value)}
          >
            <option defaultValue>By Category</option>
            {categoryList.map((c) => (
              <option className="dropdown-item" key={c} value={c}>
                {c}
              </option>
            ))}
            ;
          </select>
        </div>


      </form>
    </div>
  );
}

export default ClubSearch;