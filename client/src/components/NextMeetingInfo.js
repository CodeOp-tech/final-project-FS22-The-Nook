import React, { useState } from "react";

function NextMeetingInfo(props) {
  console.log("club", props.club);
  console.log("clubBooks", props.clubBooks);

  return (
    <div className="NextMeetingInfo">
      <div className="container border ms-0">
        <h2>Next Meeting</h2>
        <div className="row my-0">
          <div className="col w-25 mb-3 p-0 my-auto">
            {props.clubBooks.length ? (
              <>
                <img
                  src={props.clubBooks[props.clubBooks.length - 1].image}
                  alt={props.clubBooks[props.clubBooks.length - 1].title}
                  className="my-auto"
                />
                <h5>{props.clubBooks[props.clubBooks.length - 1].title}</h5>
                <h6>{props.clubBooks[props.clubBooks.length - 1].author}</h6>
              </>
            ) : (
              <img src={props.club.image} />
            )}
          </div>
          <div className="col w-75 mb-6 my-auto">
            {props.club && props.clubBooks.length ? (
              <div>
                <h3>
                  Date:{" "}
                  {props.clubBooks[props.clubBooks.length - 1].date.slice(
                    0,
                    10
                  )}
                </h3>
                <h3>Time: {props.club.next_mtg_time.slice(0, 5)}</h3>
                <h3>Location: {props.club.next_mtg_location_name}</h3>
                <h4>
                  `Address: {props.club.next_mtg_address},{" "}
                  {props.club.next_mtg_city}, {props.club.next_mtg_postal_code},{" "}
                  {props.club.next_mtg_country}
                </h4>
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
