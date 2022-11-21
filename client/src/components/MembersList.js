import React from "react";
import { Link } from "react-router-dom";

function MembersList(props) {
  return (
    <div className="container MembersList">
      <div className="row">
        <div className="col">
          {props.currentClub.membersList.map((m) => (
            <Link
              to={`/users/${m.id}`}
              className="btn btn-outline-light mx-2 btn-sm user"
              key={m.id}
            >
              <h4>{m.username}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersList;
