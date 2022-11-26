import React, { useEffect, useState } from "react";
import "./TopBooks.scss";
import { Link } from "react-router-dom";
import Api from "../helpers/Api";

function TopBooks(props) {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchBooksByRating();
  }, []);

  async function fetchBooksByRating() {
    let myresponse = await Api.getTopBooks();
    if (myresponse.ok) {
      let topFour = myresponse.data;
      setTopBooks(topFour);
      setErrorMsg("");
    } else {
      setTopBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }
  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bookContainer">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3">
        {topBooks.map((b) => (
          <div className="col" key={b.book_id}>
            <div className="card bookCard">
              <img src={b.image} alt={b.title} className="card-img-top" />
              <div className="card-body">
                <div className="card-title">
                  {user ? (
                    <Link to={`/books/all/${b.id}`} key={b.id}>
                      <h6>{b.title}</h6>
                    </Link>
                  ) : (
                    <h5 className="card-title">by {b.title}</h5>
                  )}
                </div>

                <h5 className="card-title">by {b.author}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopBooks;
