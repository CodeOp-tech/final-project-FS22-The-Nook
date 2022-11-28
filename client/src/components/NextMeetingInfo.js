import React from "react";
import "./NextMeetingInfo.scss";

function NextMeetingInfo(props) {
  return (
    <div className="NextMeetingInfo">
      <h2 className="">Next Meeting</h2>


      <div className="card  mb-3" style={{ maxWidth: "550px" }}>
        
        <div className="row g-0">
          <div className="col-xl-4">
            {props.clubBooks.length ? (
              <>
                <img
                  src={props.clubBooks[props.clubBooks.length - 1].image}
                  alt={props.clubBooks[props.clubBooks.length - 1].title}
                  className="my-3 ms-2"
                  id="book-cover-img"
                />
                <p className="card-text">
                  <small className="text-muted">
                    <h5>{props.clubBooks[props.clubBooks.length - 1].title}</h5>
                    <h6>
                      {props.clubBooks[props.clubBooks.length - 1].author}
                    </h6>
                  </small>
                </p>
              </>
            ) : (
              <img src={props.currentClub.image} className="my-3 ms-2" id="book-cover-img"/>
            )}
          </div>
          <div className="col-md-8 m-auto">
            {props.currentClub && props.clubBooks.length ? (
              <div className="card-body  ms-3 ">
                <div className="card-text text-center text-md-left meetingText">
                  <h5>
                    <b>Date:</b>{" "}
                    {props.clubBooks[props.clubBooks.length - 1].date.slice(
                      0,
                      10
                    )}
                  </h5>
                  <h5>
                    <b>Time:</b> {props.currentClub.next_mtg_time.slice(0, 5)}
                  </h5>
                  <h5>
                    <b>Location:</b> {props.currentClub.next_mtg_location_name}
                  </h5>
                  <h5>
                    <b>Address:</b> {props.currentClub.next_mtg_address},{" "}
                    {props.currentClub.next_mtg_city},{" "}
                    {props.currentClub.next_mtg_postal_code},{" "}
                    {props.currentClub.next_mtg_country}
                  </h5>
                </div>
              </div>
            ) : (
              <h4>Meeting details coming soon!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextMeetingInfo;
