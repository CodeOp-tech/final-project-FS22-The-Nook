import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function MembersList(props) {
  const navigate = useNavigate();

  return (
    <div className="container MembersList">
      <div className="row">
        {props.club.members.map((m) => (
          <div className="col border bg-light" key={m.id}>
            <h4>{m.username}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersList;
