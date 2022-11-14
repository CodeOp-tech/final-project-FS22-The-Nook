import React, { useState } from "react";

const EMPTY_FORM = {
  author: "",
  title: "",
  image: "",
  date: "",
  club_id: null,
};

function AddClubBook(props) {
  const [bookToPost, setBookToPost] = useState({});
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const GOOGLE_BOOKS_API_KEY = "AIzaSyCHigh0Hpb_cmfcO1IpRKaCPCki7A4cC3M"; //TODO - connect .env file to obscure key
  console.log("booktopost", bookToPost);

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  async function getBook(formData) {
    let title = formData.title.replaceAll(" ", "+");
    let url = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_BOOKS_API_KEY}`;

    try {
      let response = await fetch(url);
      if (response.ok) {
        let results = await response.json(); //converts JSON to JS
        let bookObj = {
          author: results.items[1].volumeInfo.authors[0],
          title: results.items[1].volumeInfo.title,
          image: results.items[1].volumeInfo.imageLinks.thumbnail,
          date: formData.date,
          club_id: 1, // TODO: change from hard-coded value once connected to club
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

  function handleSubmit(e) {
    e.preventDefault();
    getBook(formData);
    setError("");
    setBookToPost({});
    setFormData(EMPTY_FORM);
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
