import React from "react";
import { Link } from "react-router-dom";

function MembersList(props) {
  return (
    <div className="container border MembersList">
      <div className="row">
        <div className="col-md-10">
          {props.currentClub.membersList.map((m) => (
            <div className="btn btn-dark btn-rounded disabled mt-3" key={m.id}>
              <h4>{m.username}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersList;
