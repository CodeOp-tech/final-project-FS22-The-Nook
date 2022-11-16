import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States Minor Outlying Island",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function AddMeetingForm(props) {
  const { id } = useParams();

  const EMPTY_FORM = {
    author: "",
    title: "",
    image: "",
    date: "",
    time: "",
    location: {
      locationName: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    club_id: id,
  };

  const [newBook, setNewBook] = useState({});
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleNestedChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    setFormData(({ location }) => ({
      location: {
        ...location,
        [name]: value,
      },
    }));
  }

  function handleAddCountry(e) {
    formData.location.country = e.target.value;
  }

  const postBook = (formData) => {
    let postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    fetch("/books", postOptions)
      .then((res) => res.json())
      .then((json) => {
        setNewBook(json);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setNewBook({});
    postBook(formData);
    setError("");
    setFormData(EMPTY_FORM);
    navigate(`/clubs/${id}`);
  }

  return (
    <div className="AddMeetingForm">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Book Title
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="title" className="form-label">
              Meeting Date
            </label>
            <input
              className="form-control"
              value={formData.date}
              id="read-by-date"
              name="date"
              type="date"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="col mb-3">
            <label htmlFor="title" className="form-label">
              Meeting Time
            </label>
            <input
              className="form-control"
              value={formData.time}
              id="meeting-time"
              name="time"
              type="time"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="locationName" className="form-label">
            Location Name
          </label>
          <input
            type="text"
            className="form-control"
            id="location-name"
            placeholder="Name of cafe, bar, park, library, etc."
            name="locationName"
            value={formData.location.locationName}
            onChange={(e) => handleNestedChange(e)}
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="123 Main St"
            name="address"
            value={formData.location.address}
            onChange={(e) => handleNestedChange(e)}
          />
        </div>
        <div className="row">
          <div className="col-md-5">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              name="city"
              value={formData.location.city}
              onChange={(e) => handleNestedChange(e)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor="inputZip" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPostalCode"
              name="postalCode"
              value={formData.location.postalCode}
              onChange={(e) => handleNestedChange(e)}
            />
          </div>

          <div className="col-md-4 my-auto dropdown">
            <label htmlFor="inputCountry" className="form-label">
              Country
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onClick={handleAddCountry}
              name="country"
            >
              <option defaultValue></option>
              {countryList.map((c) => (
                <option
                  className="dropdown-item"
                  key={c}
                  name="country"
                  value={c}
                >
                  {c}
                </option>
              ))}
              ;
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3 btn-sm">
          Add New Meeting
        </button>
      </form>
    </div>
  );
}

export default AddMeetingForm;
