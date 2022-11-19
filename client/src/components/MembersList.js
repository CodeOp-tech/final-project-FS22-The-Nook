import React from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

function MembersList(props) {
  const navigate = useNavigate();
  let { clubId } = useParams();
  let ix = clubId - 1;

  return (
    <div className="container MembersList">
      <div className="row">
        <div className="col">
          {props.clubs[ix].membersList.map((m) => (
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
