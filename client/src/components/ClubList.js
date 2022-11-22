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
    
    <div class="row row-cols-1 row-cols-md-3 g-4">
    {props.clubs.map(c => (
  <div class="col">
    <div class="card h-100">
      <img src={c.image} class="card-img-top" alt={c.name}/>
      <div class="card-body">
        <h5 class="card-title">{c.name}</h5>
        <p class="card-text">
          <b>Genre:</b> {c.category}
          <br></br>
          <b>Location:</b> {c.next_mtg_city}, {c.next_mtg_country}
          <br></br>
          <b>Members:</b> {c.membersCount}
        </p>
        <button className="btn btn-outline-dark btn-sm info-button mt-auto" type="button" onClick={e => redirect(c.id)}>More Info</button> 
      </div>
    </div>
  </div>
  ))}
  </div>
    
 </div>

    // <div className="container">
    //   <div className="row  justify-content-center">
      
    //         {
    //             props.clubs.map(c => (
    //               <div className="col-md-5 col-lg-4">
    //                 <div className="card m-1" key={c.id}>
    //                   <div className="card-body f-lex flex-column">
    //                     <img 
    //                       className="card-img" 
    //                       src={c.image} 
    //                       alt={c.name}
    //                     />
    //                      <div className="card-img-overlay info-bg">
    //                         <h4>{c.name}</h4>
    //                         <p className="mb-0 mt-3 text-left"><b>Genre:</b> {c.category}</p>
    //                         <p className="mb-0"><b>Location: </b>{c.next_mtg_city}</p>
    //                         <p className="mb-0"><b>Members:</b> {c.membersCount}</p>
    //                         <button className="btn btn-outline-dark btn-sm info-button mt-auto" type="button" onClick={e => redirect(c.id)}>More Info</button>   
    //                      </div>  
    //                      </div>             
    //                 </div>
    //               </div>
    //             ))
    //         }
    //  </div>
    // </div>

  );
}



export default ClubList;
