import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubList.css";

function ClubList(props) {  

  const navigate = useNavigate();

function redirect(clubId) {
  navigate(`./${clubId}`)
}

  return (
    <div className="container">
      <div className="row  justify-content-center">
      
            {
                props.clubs.map(c => (
                  <div className="col-md-5 col-lg-4" key={c.id}>
                    <div className="card m-1" key={c.id}>
                        <img 
                          className="card-img" 
                          src={c.image} 
                          alt={c.name}
                        />
                         <div className="card-img-overlay info-bg">
                            <h4>{c.name}</h4>
                            <p className="mb-0 mt-3 text-left"><b>Genre:</b> {c.category}</p>
                            <p className="mb-0"><b>Location: </b>{c.next_mtg_city}</p>
                            <p className="mb-0"><b>Members:</b> {c.membersCount}</p>
                            <button className="btn btn-outline-secondary mt-5" type="button" onClick={e => redirect(c.id)}>More Info</button>   
                         </div>               
                    </div>
                  </div>
                ))
            }
     </div>
    </div>

  );
}



export default ClubList;
