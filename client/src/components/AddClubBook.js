import React, { useState } from "react";

function AddClubBook(props) {
  const [bookToPost, setBookToPost] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setSearchTitle(event.target.value);
  }

  async function getBook(searchTitle) {
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
        setBookToPost(bookObj);
        postBook(bookObj);
      } else {
        setError(`Server error: ${response.status}: ${response.statusText}`);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    getBook(searchTitle);
    // console.log("after getBook", bookToPost);
    // postBook(bookToPost);
    // console.log("after bookToPost");
    setSearchTitle("");
    setError("");
  }

  const postBook = (book) => {
    let postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };
    console.log(book);
    console.log(JSON.stringify(book));
    console.log("postOptions", postOptions);
    fetch("/books", postOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log("json", json);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
          Add
        </button>
      </form>
      <h3>Your Club's Next Book:</h3>
    </div>
  );
}

export default AddClubBook;
