import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ReactStars from "react-stars";
import Api from "../helpers/Api";
import "./EditProfileView.scss";
import { DateTime } from "luxon";
import EditCommentModal from "../components/EditCommentModal";
import ClubSearchProfile from "../components/ClubSearchProfile";
import BookSearchProfile from "../components/BookSearchProfile";
import AddBookForm from "../components/AddBookForm";

function EditProfileView(props) {
  const [searchParams] = useSearchParams({});
  let user = props.user;
  let [book, setBook] = useState({});
  let [shownClubs, setShownClubs] = useState(user.clubs);
  let [shownBooks, setShownBooks] = useState(user.books);

  const name = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  const title = searchParams.get("title") || "";
  const author = searchParams.get("author") || "";

  // search effect function
  useEffect(() => {
    getClubs();
  }, [name, category, location]);

  useEffect(() => {
    getBooks();
  }, [title, author]);

  // club search function
  async function getClubs() {
    const query = new URLSearchParams({
      name: name,
      category: category,
      next_mtg_city: location,
    }).toString();

    let url = `/users/${user.id}/?${query}`;
    let response = await Api.getUserFiltered(url);

    if (response.data) {
      setShownClubs(response.data.clubs);
    }
  }

  const postBookForUser = async (bookData) => {
    let responseBook = await Api.postBookUser(bookData, user.id);
    if (responseBook.ok) {
      props.setUser(responseBook.data);
      setShownBooks(responseBook.data.books);
    }
  };

  // book search function
  async function getBooks() {
    const query = new URLSearchParams({
      title: title,
      author: author,
      category: category,
    }).toString();

    let url = `/users/${user.id}/?${query}`;
    let response = await Api.getUserFiltered(url);

    if (response.data) {
      props.setUser(response.data);
      setShownBooks(response.data.books);
    }
  }

  async function exitGroup(event) {
    let clubName = event.target.name;
    let club = props.clubs.find((c) => c.name === clubName);

    let confirmation = confirm(
      `Do you really want to leave the club "${club.name}"?`
    );
    if (confirmation) {
      let response = await Api.leaveClub(user.id, club.id);
      props.setUser(response.data);
      setShownClubs(response.data.clubs);
    }
  }

  const ratingChanged = (newRating, book) => {
    book.rating = newRating;
    updateBook(book);
  };

  function toggleFavorite(book) {
    book.favorite === 1 ? (book.favorite = 0) : (book.favorite = 1);
    updateBook(book);
  }

  function changeDate(event, book) {
    book.date_read = event.target.value;
    updateBook(book);
  }

  async function updateBook(book) {
    let date_read = DateTime.fromISO(book.date_read).toFormat("yyyy-LL-dd");
    let body = {
      rating: `${book.rating}`,
      date_read: `${date_read}`,
      favorite: `${book.favorite}`,
      comment: `${book.comment}`,
      user_id: `${user.id}`,
    };
    let responsePatch = await Api.patchBook(body, book.book_id);
    if (responsePatch.ok) {
      props.setUser(responsePatch.data);
      setShownBooks(responsePatch.data.books);
    }
  }

  return (
    <div className="EditProfile my-5 ">
      <h2 className="title pt-5">Edit Your Clubs</h2>

      <ClubSearchProfile user={user} getClubs={(e) => getClubs()} />

      {shownClubs &&
        shownClubs.map((c) => (
          <div
            className="card text-bg-dark d-inline-flex myClubsCards mb-2 mx-3"
            key={c.id}
          >
            <img
              src={c.image}
              id="header-img"
              className="card-img mb-0 myClubsCards"
              alt={c.name}
            />
            <div className="card-img-overlay">
              <p className="EditClubDetails">
                <h5>{c.name}</h5>

                <button
                  type="button"
                  className="btn btn-outline-dark exit"
                  onClick={(e) => exitGroup(e)}
                  name={c.name}
                >
                  Leave club
                </button>
              </p>
            </div>
          </div>
        ))}

      <br />
      <h2 className="title mt-3">Want To Find More?</h2>
      <br></br>
      <a className="btn btn-outline-dark btn-sm" href="/clubs">
        Join more clubs
      </a>

      <br />

      <h2 className="title mt-5">Edit Your Bookshelf</h2>
      <br />
      <div>
        <button
          data-bs-toggle="modal"
          data-bs-target="#bookModal"
          className="mb-2 btn btn-outline-dark add-button btn-sm"
        >
          {" "}
          Add a New Book
        </button>
      </div>

      <AddBookForm
        id="bookModal"
        user={user}
        postBookForUser={(bookData) => postBookForUser(bookData)}
      />

      <h2 className="title mt-5">Search For A Book</h2>
      <BookSearchProfile user={user} getBooks={(e) => getBooks()} />

      {shownBooks &&
        shownBooks.map((b) => (
          <div key={b.author} className="d-inline-flex my-5">
            <div key={b.title} className="card me-4 h-100 myBooksCard">
              <div>
                <div>
                  <img
                    src={`${b.image}`}
                    className="card-img-top"
                    id="book-img"
                    alt={`${b.title}`}
                  />
                </div>

                <div className="card-body">
                  <h6>
                    My rating:
                    <ReactStars
                      count={5}
                      size={24}
                      value={b.rating}
                      onChange={(r) => ratingChanged(r, b)}
                      color2={"#ffd700"}
                    />
                  </h6>

                  <h5 className="card-title">{b.title}</h5>

                  <h6 className="card-text">By {b.author}</h6>

                  <label>
                    <h6 className="mt-2">Read on:</h6>

                    <input
                      type="date"
                      defaultValue={DateTime.fromISO(b.date_read).toFormat(
                        "yyyy-LL-dd"
                      )}
                      onChange={(e) => changeDate(e, b)}
                    />
                  </label>

                  <button
                    key={b.id}
                    id="button"
                    type="button"
                    className="btn btn-outline-danger favoritebtn py-0 mb-4"
                    name={b.title}
                    onClick={(e) => toggleFavorite(b)}
                  >
                    {b.favorite === 1 ? (
                      <i className="bi bi-heart-fill heart"></i>
                    ) : (
                      <i className="bi bi-heart heart" name={b.title}></i>
                    )}
                  </button>

                  <br />
                  <a
                    className="card-title"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={(e) => setBook(b)}
                  >
                    {" "}
                    Edit Review
                  </a>
                </div>

                <EditCommentModal
                  id="myModal"
                  book={book}
                  updateBook={(book) => updateBook(book)}
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default EditProfileView;
