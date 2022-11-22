import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function ClubSearchProfile(props) {
   
    const [searchInput, setSearchInput] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [category, setCategory] = useState("");

    let user = props.user;
    let navigate = useNavigate();

    useEffect(() => {
    changeUrl();
    }, [searchInput, searchLocation, category])

      
      function changeUrl(){
        navigate(`/users/${user.id}/edit/?search=${searchInput}&location=${searchLocation}&category=${category}`)
        props.getClubs && props.getClubs()
        
      }




  return (
    <div className="ClubSearch pt-2">
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
                className="form-control"
                type="search"
                placeholder="Location"
                aria-label="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
            />

            <div className="mt-3">
                {/* <label htmlhtmlFor="floatingSelect">Choose a category</label> */}
                <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Choose category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}            
                >
                    <option className="" defaultValue>Choose a category</option>
                    <option data-tokens="1">biography</option>
                    <option data-tokens="2">casual</option>
                    <option data-tokens="3">childrens literature</option>
                    <option data-tokens="4">classics</option>
                    <option data-tokens="5">historical fiction</option>
                    <option data-tokens="6">sci-fi</option>
                    <option data-tokens="7">travel</option>
                </select>
                
            </div>
        </form>

    </div>
  );
}

export default ClubSearchProfile;
