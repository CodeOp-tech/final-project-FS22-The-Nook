import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SingleBookView.scss";
import ReactStars from "react-stars";

function SingleBookView(props) {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    getSingleBook(id);
  }, []);

  async function getSingleBook() {
    try {
      let response = await fetch(`/books/all/?book_id=${id}`);

      if (response.ok) {
        let book = await response.json();
        setBook(book);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  return (
    <div className="container sg-book p-5 my-5">
      {book.length > 0 && (
        <div>
          <h1 className="mb-5">{book[0].book_title}</h1>
          <div className="row mb-5 p-5 box-border rounded">
            <div className="col-lg-4 singleBook-box">
              <img
                className="singleBook-img "
                src={book[0].book_img}
                alt={book[0].book_title}
              />
            </div>
            <div className="col-lg-8 text-sm-center text-lg-start pe-5 mt-4 mt-md-0">
              <p>
                <b>Author: </b>
                {book[0].book_author}
              </p>
              <p>
                <b>Description: </b> Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </p>
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6 mt-5">
              <h3 className="mb-5">Clubs that have read this book:</h3>
              {book[0].clubsThatRead.length > 0
                ? book[0].clubsThatRead.map((c) => (
                    <Link to={`/clubs/${c.club_id}`} className="text-dark">
                      <div className="row overlay ">
                        <img
                          src={c.image}
                          alt={c.name}
                          style={{ height: "7.5rem" }}
                          className="club-img "
                        />
                        <div className="text-overlay">
                          <h4>
                            <b>Club name: </b>
                            {c.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))
                : "No clubs have discussed this book yet."}
            </div>

            <div className="col-md-6 mt-5">
              <h3 className="mb-5">Members who read this book:</h3>
              {book[0].usersThatRead.length > 0
                ? book[0].usersThatRead.map((u) => (
                    <div className="row mb-3 pt-2 box-border rounded text-start ">
                      <p>
                        <b>Username: </b>
                        {u.username}
                      </p>

                      <p>
                        <b>Rating: </b>
                      </p>
                      <ReactStars
                        count={5}
                        size={24}
                        value={u.rating}
                        edit={false}
                        color2={"#ffd700"}
                      />
                      <p>
                        <b>Comment: </b>
                        {u.comment}
                      </p>
                    </div>
                  ))
                : "No user has marked this book as read."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleBookView;
