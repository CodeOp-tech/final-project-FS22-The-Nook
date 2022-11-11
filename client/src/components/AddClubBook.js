import React, { useState } from "react";

function AddClubBook(props) {
  const [bookToAdd, setBookToAdd] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setSearchTitle(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getBook(searchTitle);
    // addBookCb(bookToAdd);
    setSearchTitle("");
  }

  //TO BE MOVED TO APP.JS
  function addBook(bookToAdd) {}

  async function getBook(searchTitle) {
    // setError("");

    let url = `http://openlibrary.org/search.json?title=${searchTitle}`;

    try {
      let response = await fetch(url);
      if (response.ok) {
        let results = await response.json(); //converts JSON to JS
        let bookObj = {
          author: results.docs[0].author_name[0],
          title: results.docs[0].title,
          image: `https://covers.openlibrary.org/b/id/${results.docs[0].cover_i}-L.jpg`,
        };
        setBookToAdd(bookObj);
      } else {
        setError(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="AddClubBook">
      <h3>Add a Book by Title</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="titleInput"
            name="search-title"
            value={searchTitle}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddClubBook;
