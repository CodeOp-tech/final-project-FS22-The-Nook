import React, { useState, useEffect } from "react";
import Api from "../helpers/Api";

function ClubBookshelf(props) {
  const [clubBooks, setClubBooks] = useState([]);

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
      <div className="card" style="width: 18rem;">
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ClubBookshelf;
