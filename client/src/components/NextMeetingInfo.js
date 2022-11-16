import React, { useState } from "react";

function NextMeetingInfo(props) {
  return (
    <div className="NextMeetingInfo">
      <h2>Our Next Read</h2>
      <img src={props.clubBooks.image} alt={props.clubBooks.title} />
      <h3>Our Next Meeting Details</h3>
      <h4>{props.nextMeeting.location}</h4>
    </div>
  );
}

export default NextMeetingInfo;
