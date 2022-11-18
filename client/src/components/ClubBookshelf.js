import React, { useState, useEffect } from "react";
import Api from "../helpers/Api";

function ClubBookshelf(props) {
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

  return (
    <div className="ClubBookshelf row mb-2">
      <div className="container border me-0">
        <h2 className="mt-3">Bookshelf</h2>
        <div className="row">
          {props.clubBooks &&
            props.clubBooks.map((b) => (
              <div key={b.id} className="col">
                <div className="card mh-290px" style={{ width: "12rem" }}>
                  <div style={{ width: "12rem", height: "23rem" }} key={b.id}>
                    <div>
                      <img
                        src={`${b.image}`}
                        className="card-img-top py-0 mb-0"
                        alt={`${b.title}`}
                      />
                    </div>
                    <div className="card-body mb-0">
                      {/* <h5 className="card-title">{b.title}</h5>
                      <h6 className="card-text">By {b.author}</h6> */}
                      <h6 className="card-text pt-0 mt-0">
                        Discussed {formatDate(b.date)}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ClubBookshelf;
