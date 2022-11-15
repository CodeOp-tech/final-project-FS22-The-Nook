import React, { useState } from "react";

const EMPTY_FORM = {
  author: "",
  title: "",
  image: "",
  date: "",
  club_id: null,
};

function AddClubBook(props) {
  const [bookImage, setBookImage] = useState({});
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
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
        setBookImage(json);
        console.log("json", json);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    postBook(formData);
    setError("");
    setFormData(EMPTY_FORM);
  }

  return (
    <div className="AddClubBook">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
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

        <div className="mb-3">
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

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <h3>Your Club's Next Book:</h3>
      {bookImage ? <img src={bookImage.image} /> : null}
    </div>
  );
}

export default AddClubBook;
