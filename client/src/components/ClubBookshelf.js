import React from "react";
import "./ClubBookshelf.scss";

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
    <div className="ClubBookshelf row mb-3">
      <div className="container me-0">
        <h2 className="mt-3 bookshelfname">Bookshelf</h2>
        <div className="card-group row-cols-1 row-cols-sm-2 row-cols-lg-3 ">
          {props.clubBooks &&
            props.clubBooks.map((b) => (
              <div key={b.id} className=" col-xl-3 ">
                <div className="card mx-3 h-100">
                  <img
                    src={`${b.image}`}
                    className="card-img-top py-0 mb-0"
                    alt={`${b.title}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{b.title}</h5>
                    <div className="card-text">
                      <h6>By {b.author}</h6>
                      <h7>Discussed on:
                        <br></br> {formatDate(b.date)} </h7>
                      </div>
                  </div>
                  {/* <div className="card-footer">
                    <small className="text-muted">
                      Discussed on:<br></br>
                      {formatDate(b.date)}
                    </small>
                  </div> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ClubBookshelf;
