import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../helpers/Api";

function PollOptionsForm(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const EMPTY_POLL_OPTIONS_FORM = {
    book1: "",
    votes1: 0,
    book2: "",
    votes2: 0,
    book3: "",
    votes3: 0,
    club_id: id,
  };

  const [pollFormData, setPollFormData] = useState(EMPTY_POLL_OPTIONS_FORM);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setPollFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addBookPollOptionsCb(pollFormData);
    setPollFormData(EMPTY_POLL_OPTIONS_FORM);
  }

  return (
    <div className="PollOptionsForm">
      <form className="w-100 mx-0" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-6">
            <label htmlFor="title" className="form-label">
              Book 1
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              name="book1"
              value={pollFormData.book1}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col mb-6">
            <label htmlFor="title" className="form-label">
              Book 2
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              name="book2"
              value={pollFormData.book2}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col mb-6">
            <label htmlFor="title" className="form-label">
              Book 3
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              name="book3"
              value={pollFormData.book3}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3 btn-sm">
          Add Poll Options
        </button>
      </form>
    </div>
  );
}

export default PollOptionsForm;
