import React, { useState } from "react";

function AddClubBook(props) {
  const [bookToPost, setBookToPost] = useState({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  // console.log(bookToPost);

  console.log("formData", formData);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  async function getBook(formData) {
    let url = `http://openlibrary.org/search.json?title=${formData.title}`;

    try {
      let response = await fetch(url);
      if (response.ok) {
        let results = await response.json(); //converts JSON to JS
        let bookObj = {
          author: results.docs[0].author_name[0],
          title: results.docs[0].title,
          image: `https://covers.openlibrary.org/b/id/${results.docs[0].cover_i}-L.jpg`,
          date: formData.date,
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
    getBook(formData);
    setFormData({});
    setError("");
  }

  const postBook = (book) => {
    let postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };

    fetch("/books", postOptions)
      .then((res) => res.json())
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
            name="title"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            When should the book be read by?
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
      {bookToPost ? <img src={bookToPost.image} /> : null}
    </div>
  );
}

export default AddClubBook;
