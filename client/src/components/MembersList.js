import React from "react";
import { useNavigate, Link } from "react-router-dom";

function MembersList(props) {
  const navigate = useNavigate();

  return (
    <div className="container MembersList">
      <div className="row">
        <div className="col">
          {props.club.members.map((m) => (
            <Link to={`/users/${m.id}`} className="btn btn-primary" key={m.id}>
              <h4>{m.username}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MembersList;
