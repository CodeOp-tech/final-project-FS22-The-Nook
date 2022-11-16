import React, { useState, useEffect } from "react";
import Api from "../helpers/Api";

function ClubBookshelf(props) {
  const [clubBooks, setClubBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchClubBooks();
  }, []);

  function formatDate(date) {
    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };
    let year = date.slice(0, 4);
    let month = months[date.slice(5, 7)];
    let day = date.slice(8, 10);

    return `${month} ${day}, ${year}`;
  }
  //Get clubs's books
  async function fetchClubBooks() {
    let myresponse = await Api.getClubBooks(`${props.club.id}`);
    if (myresponse.ok) {
      setClubBooks(myresponse.data);
      setErrorMsg("");
    } else {
      setClubBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  return (
    <div className="ClubBookshelf row mb-2">
      <h2>Our Bookshelf</h2>
      {clubBooks.map((b) => (
        <div key={b.id} className="col my-2">
          <div className="card" style={{ width: "12rem" }}>
            <div key={b.id}>
              <div>
                <img
                  src={`${b.image}`}
                  className="card-img-top"
                  alt={`${b.title}`}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{b.title}</h5>
                <h6 className="card-text">By {b.author}</h6>
                <h6 className="card-text">Discussed {formatDate(b.date)}</h6>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClubBookshelf;
