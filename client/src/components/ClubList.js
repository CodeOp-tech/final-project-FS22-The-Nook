import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function ClubList(props) {  

  function joinClub(club) {
    props.userJoinsClubCb(club);
  }

  return (
    <div className="container ClubSearch">
      <div className="row">

      
            {
                props.clubs.map(c => (

                    <div className="col border bg-light" key={c.id}>
                        <p className="fs-3">{c.name}</p>
                        <p><b>Genre:</b> {c.category}</p>
                        <p><b>Location:</b></p>
                        <p><b>Members:</b> {c.membersCount}</p>
                        <button className="btn btn-outline-secondary mt-3" type="button" onClick={(e) => joinClub(c)}>Join</button>
                    </div>
                ))
            }
     </div>
    </div>
  );
}

export default ClubList;
