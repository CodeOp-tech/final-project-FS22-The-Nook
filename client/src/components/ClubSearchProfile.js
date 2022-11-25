import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import categoryList from "./DropdownCategoryList.js";
// import "./ClubSearchProfile.css";

function ClubSearchProfile(props) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState("");

  let user = props.user;

  useEffect(() => {
    changeUrl();
  }, [searchInput, searchLocation, category]);

  function changeUrl() {
    navigate(
      `/users/${user.id}/edit/?search=${searchInput}&location=${searchLocation}&category=${category}`
    );
    props.getClubs && props.getClubs();
  }

  function changeUrl() {
    navigate(
      `/users/${user.id}/edit/?search=${searchInput}&location=${searchLocation}&category=${category}`
    );
    props.getClubs && props.getClubs();
  }

  return (
    <div className="ClubSearchProfile pt-2 mb-5">
      <form className="edit-form" role="search">
        <input
          className="form-control w-100 mb-2"
          type="search"
          placeholder="Search for a club"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <input
          className="form-control w-100 mb-2"
          type="search"
          placeholder="Location"
          aria-label="Location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />


        <div className="mb-3 dropdown ">
          <select
            className="form-select w-100"
            id="floatingSelect"
            name="category"
            aria-label="Choose category"
            value={category}
            onChange={(e) =>
              e.target.value === "Choose a category"
                ? setCategory("")
                : setCategory(e.target.value)
            }
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
      </form>
    </div>
    
  );
}

export default ClubSearchProfile;
