import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


function ClubList(props) {  

  function joinClub(id) {
    props.userJoinsClubCb(id);
  }

  return (
    <div className="container ClubSearch">
      <div className="row">

      
            {
                props.clubs.map(p => (
                    <div className="col border" key={p.id}>
                        <p className="fs-3">{p.name}</p>
                        <p><b>Genre:</b></p>
                        <p><b>Location:</b></p>
                        <p><b>Members:</b></p>
                        <button className="btn btn-outline-secondary mt-3" type="button" onClick={(e) => joinClub(p.id)}>Join</button>
                    </div>
                ))
            }
     </div>
    </div>
  );
}

export default ClubList;
