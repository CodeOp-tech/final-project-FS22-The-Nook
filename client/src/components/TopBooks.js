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
      let topFour = myresponse.data.data;
      setTopBooks(topFour);
      setErrorMsg("");
    } else {
      setTopBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  const topFour = topBooks;
  return (
    <div className="bookContainer">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {topBooks.map((b) => (
          <div className="col" key={b.book_id} >

            <div className="card bookCard">
              <img src={b.image} className="card-img-top" alt="book 1" />
              <div className="card-body">
                <div className="card-title">{b.title}</div>
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
