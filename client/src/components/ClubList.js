import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


function ClubList(props) {  

  const navigate = useNavigate();

    function joinClub(club) {
    if (props.user) {
      props.userJoinsClubCb(club) 
    } else {
      navigate('/login')
    }
  }

  // function joinClub(club) {
  //   if (props.user && props.user.clubs.name === club.name) {
  //     // props.userJoinsClubCb(club) 
  //     console.log("user is logged in and is already a member of the club")
  //   } else if (props.user.clubs.name !== club.name){
  //     // navigate('/login')
  //     console.log("user is logged in and not a member of the club")
  //   } else {
  //     console.log("user is not logged in")
  //   }
  // }
  
  // function joinClub(club) {
  //   if (props.user) { 
  //     if (props.user.clubs.name !== club.name) {
  //       // props.userJoinsClubCb(club) 
  //       console.log("user is logged in and not a member")
  //     }

  //   } else {
  
  //     console.log("user is logged in and already a member")

  //   }
  //   // console.log("not a user and should go to login")
  //   // return navigate('/login')

  // }

 



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
