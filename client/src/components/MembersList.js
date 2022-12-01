import React from "react";
import { Link } from "react-router-dom";
import "./MembersList.scss";

function MembersList(props) {
  return (
    <div className="container MembersList">
      <div className="row">
        <div className="col-md-10  mx-auto">
          <h2 className="title">Members</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-10  mx-auto">
          {props.currentClub.membersList.map((m) => (
            <div
              className="btn btn-outline-dark btn-rounded disabled mt-3"
              key={m.id}
            >
              <h4>{m.username}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersList;
