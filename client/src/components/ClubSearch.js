import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ClubSearch.css'



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

    </div>
  );
}

export default ClubSearch;
