import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CountryList from "./DropdownCountries.js";

function AddMeetingForm(props) {
  const { id } = useParams();
  console.log("countries", CountryList);
  const EMPTY_NEXT_BOOK_FORM = {
    author: "",
    title: "",
    image: "",
    date: "",
    club_id: 1, //TODO change to id once params are available
  };
  const EMPTY_MEETING_DETAILS_FORM = {
    time: "",
    locationName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    club_id: 1, //TODO change to id once params are available
  };
  // const [newMeeting, setNewMeeting] = useState({});
  const [nextBookFormData, setNextBookFormData] =
    useState(EMPTY_NEXT_BOOK_FORM);
  const [meetingDetailsFormData, setMeetingDetailsFormData] = useState(
    EMPTY_MEETING_DETAILS_FORM
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleNewBookChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setNextBookFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleNewMeetingChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setMeetingDetailsFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  // function handleNestedChange(e) {
  //   const value = e.target.value;
  //   const name = e.target.name;
  //   setFormData(({ location }) => ({
  //     location: {
  //       ...location,
  //       [name]: value,
  //     },
  //   }));
  // }

  const postBook = (nextBookFormData) => {
    let postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextBookFormData),
    };

    fetch("/books", postOptions)
      .then((res) => res.json())
      // .then((json) => {
      //   setNewMeeting(json);
      // })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const patchClub = (meetingDetailsFormData) => {
    let patchOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(meetingDetailsFormData),
    };

    fetch("/clubs/:id", patchOptions)
      .then((res) => res.json())
      // .then((json) => {
      //   setNewMeeting(json);
      // })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    meetingDetailsFormData.time = `${meetingDetailsFormData.time}:00`;
    postBook(nextBookFormData);
    patchClub(meetingDetailsFormData);
    setError("");
    setMeetingDetailsFormData(EMPTY_MEETING_DETAILS_FORM);
    setNextBookFormData(EMPTY_NEXT_BOOK_FORM);
    navigate(`/clubs/1`); //TODO: Change to (`/clubs/${id}`);
  }

  return (
    <div className="AddMeetingForm">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-6">
            <label htmlFor="title" className="form-label">
              Book Title
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              name="title"
              value={nextBookFormData.title}
              onChange={(e) => handleNewBookChange(e)}
            />
          </div>
          <div className="col mb-2">
            <label htmlFor="title" className="form-label">
              Meeting Date
            </label>
            <input
              className="form-control"
              value={nextBookFormData.date}
              id="read-by-date"
              name="date"
              type="date"
              onChange={(e) => handleNewBookChange(e)}
            />
          </div>

          <div className="col mb-2">
            <label htmlFor="title" className="form-label">
              Meeting Time
            </label>
            <input
              className="form-control"
              value={meetingDetailsFormData.time}
              id="meeting-time"
              name="time"
              type="time"
              onChange={(e) => handleNewMeetingChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label htmlFor="locationName" className="form-label">
              Location Name
            </label>
            <input
              type="text"
              className="form-control"
              id="location-name"
              placeholder="Name of cafe, bar, park, library, etc."
              name="locationName"
              value={meetingDetailsFormData.locationName}
              onChange={(e) => handleNewMeetingChange(e)}
            />
          </div>

          <div className="col-6">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="123 Main St"
              name="address"
              value={meetingDetailsFormData.address}
              onChange={(e) => handleNewMeetingChange(e)}
            />
          </div>
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
              value={meetingDetailsFormData.city}
              onChange={(e) => handleNewMeetingChange(e)}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPostalCode"
              name="postalCode"
              value={meetingDetailsFormData.postalCode}
              onChange={(e) => handleNewMeetingChange(e)}
            />
          </div>

          <div className="col-md-5 my-auto dropdown">
            <label htmlFor="inputCountry" className="form-label">
              Country
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleNewMeetingChange}
              name="country"
              value={meetingDetailsFormData.country}
            >
              <option defaultValue></option>
              {CountryList.map((c) => (
                <option className="dropdown-item" key={c} value={c}>
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
