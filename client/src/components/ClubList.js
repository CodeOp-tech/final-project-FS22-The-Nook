import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ("./ClubList.css")


function ClubList(props) {  

  const navigate = useNavigate();

function redirect(clubId) {
  navigate(`./${clubId}`)
}


//  <div class="card bg-dark text-white">
//   <img class="card-img" src="..." alt="Card image">
//   <div class="card-img-overlay">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     <p class="card-text">Last updated 3 mins ago</p>
//   </div>
// </div> 


  return (
    <div className="container ClubSearch">
      <div className="row">
      
            {
                props.clubs.map(c => (

                    <div className="col-lg-6 card " key={c.id}>
                        <img className="card-img" src={c.image} />
                        {/* <div className="card-img-overlay">
                          <div className="info-bg"> */}
                            <p className="fs-3">{c.name}</p>
                            <p><b>Genre:</b> {c.category}</p>
                            <p><b>Location:</b></p>
                            <p><b>Members:</b> {c.membersCount}</p>
                          {/* </div> */}
                        {/* </div> */}
                        <button className="btn btn-outline-secondary mt-3" type="button" onClick={e => redirect(c.id)}>More Info</button>   
                    </div>
                ))
            }
     </div>
    </div>
  );
}

export default ClubList;
