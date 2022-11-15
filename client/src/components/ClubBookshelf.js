import React, { useState, useEffect } from "react";
import Api from "../helpers/Api";

function ClubBookshelf(props) {
  const [clubBooks, setClubBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchClubBooks();
  }, []);

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
    <div className="ClubBookshelf">
      {clubBooks.map((b) => (
        <div key={b.id} className="col my-2">
          <div className="card" style={{ width: "18rem" }}>
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
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClubBookshelf;
