import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



function ClubSearch(props) {
    const nav = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [category, setCategory] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        nav(
            "/clubs/?search=" +
            searchInput +
            "&category=" +
            category
        );

        //reset search input fields
        setSearchInput("");
        setCategory("");
    }

  return (
    <div className="ClubSearch">
        <form role="search" onSubmit={handleSubmit}>
            <input
                className="form-control"
                type="search"
                placeholder="Search for a club"
                aria-label="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className="form-floating">
                {/* <label htmlFor="floatingSelect">Choose a category</label> */}
                <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Choose category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}            
                >
                    <option defaultValue>Choose a category</option>
                    <option data-tokens="1">classics</option>
                    <option data-tokens="2">sci-fi</option>
                </select>
                
            </div>
            <button type="submit">Search</button>

        </form>

    </div>
  );
}

export default ClubSearch;
