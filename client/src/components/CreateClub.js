import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateClub.css'
import CountryList from "./DropdownCountries";

const EMPTY_NEW_CLUB_FORM = {
  name: "",
  category: "",
  city: "",
  country: "",
  image: "",
  members: 0,
};

function CreateClub() {
  const [fields, setFields] = useState(EMPTY_NEW_CLUB_FORM);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleNewClubChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFields((state) => ({
      ...state,
      [name]: value,
    }));
  }

  async function addClub(fields) {
    try {
      // create response - fetch data, method post
      let response = await fetch("/clubs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });
      //if response fetch works
      if (response.ok) {
        nav("/clubs");
      } else {
        console.log(`Server Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network Error: ${err.message}`);
    }
  }

  const handleClubSubmit = (e) => {
    e.preventDefault();
    addClub();
    setError("");
    setFields(EMPTY_NEW_CLUB_FORM);
    // navigate(`/clubs`);
  };

  return (
    <div className="CreateClubContainer text-centered">
      <h3 className="CreateClubH">Create A New Club</h3>

      <form onSubmit={handleClubSubmit}>

        <div className="mb-3">
          <label htmlFor="clubName" className="form-label">
            Club Name 
          </label>
          <input
            type="text"
            className="form-control-sm"
            id="nameInput"
            name="name"
            
            placeholder="e.g. Les Bibliophiles"
            value={fields.name}
            onChange={(e) => handleNewClubChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clubCategory" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control-sm"
            id="categoryInput"
            name="category"
            placeholder="e.g. Romance"
            value={fields.category}
            onChange={(e) => handleNewClubChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clubCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control-sm"
            id="cityInput"
            name="city"
            placeholder="e.g. Paris"
            value={fields.city}
            onChange={(e) => handleNewClubChange(e)}
          />
        </div>


        <div className="mb-3 dropdown">
          <label htmlFor="clubCountry" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="countryInput"
            name="country"
            
            value={fields.country}
            onChange={(e) => handleNewClubChange(e)}
          >
          <option hidden >e.g. France</option>
              {CountryList.map((c) => (
                <option className="dropdown-item" key={c} value={c}>
                  {c}
                </option>
              ))};
              </select>
        </div>

        <div className="mb-3">
          <label htmlFor="clubImage" className="form-label">

            Image URL
          </label>
          <input
            type="url"
            className="form-control-sm"
            id="imageInput"
            name="image"
            placeholder="Add Link Here"
            value={fields.image}
            onChange={(e) => handleNewClubChange(e)}
          />
        </div>

        <button className="createClubButton" type="submit">
          Create Club
        </button>

      </form>
    </div>
  );
}

export default CreateClub;
