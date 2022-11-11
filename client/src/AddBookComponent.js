import React from "react";
import "./HomeView.css";

function AddBookComponent(props) {
  const [bookToAdd, setBookToAdd] = useState({});
  const [searchTitle, setSearchTitle] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
  }

  function handleSubmit(e) {
    e.preventDefault();
    getBook(searchTitle);
    addBookCb(bookToAdd);
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
          imageUrl: `https://covers.openlibrary.org/b/id/${results.docs[0].cover_i}-L.jpg`,
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
    <div className="BookSearchView">
      <h1>Add a Book by Title</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="test"
            className="form-control"
            id="titleInput"
            name="title"
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

export default BookSearchView;
