import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ClubSearch.css'



function ClubSearch(props) {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState("");


  useEffect(() => {
    changeUrl();
    }, [searchInput, searchLocation, category])


    function changeUrl(){

      navigate(`/clubs//?search=${searchInput}&location=${searchLocation}&category=${category}`)
      props.getClubs && props.getClubs()
      
    }


  return (
    <div className="ClubSearch pt-2">
        <h3>Search for a club</h3>
        <form role="search" onSubmit={handleSubmit}>
            <input
                className="form-control search-input"
                type="search"
                placeholder="By Name"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
      <form role="search">
        <input
          className="form-control"
          type="search"
          placeholder="Search for a club"
          aria-label="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

            <input
                className="form-control search-input"
                type="search"
                placeholder="By Location"
                aria-label="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
            />

            
                <select
                    className="form-select search-input"
                    id="floatingSelect"
                    aria-label="Choose category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}            
                >
                    <option className="" defaultValue>By Category</option>
                    <option data-tokens="1">Biography</option>
                    <option data-tokens="2">Casual</option>
                    <option data-tokens="3">Children's Literature</option>
                    <option data-tokens="4">Classics</option>
                    <option data-tokens="5">Historical Fiction</option>
                    <option data-tokens="6">Sci-fi</option>
                    <option data-tokens="7">Travel</option>
                </select>
                
           
            <button className="btn btn-outline-dark btn-sm search-button" type="submit">Search</button>

        </form>

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
            onChange={(e) => e.target.value === "Choose a category" ? setCategory("") : setCategory(e.target.value)}
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

export default ClubSearch;
