import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Api from "../helpers/Api";
import "./SingleClubView.css";
import { useNavigate } from "react-router-dom";
import Local from '../helpers/Local';

function SingleClubView(props) {
  let { clubId } = useParams();

  const navigate = useNavigate();

  function redirect() {
    navigate("/login")
  }



async function canJoin(club) {

  let options = {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },  
    body: JSON.stringify(club) 
  }

   // add token to the header if it exists in local storage
  let token = Local.getToken(); 
  if (token) {
     options.headers['Authorization'] = 'Bearer ' + token;
  }

  try {
    let response = await fetch (`/clubs/${club.id}`, options);
    if (response.ok) {
      let json = await response.json()
      props.setUser(json)
      console.log("this is the reply the client receives from the backend and saves it as user:", json)
    } else {
      console.log(`Server error: ${response.status} ${response.statusText}`);
    }
  } catch (err) {
     console.log(`Network error: ${err.message}`);
  }
}


  return (
    <div className="SingleClubView mt-5">
      {props.club.name ? (
        <div className="w-100">
          <div id="single-club-banner" className="row text-center px-0">
            <img
              src={props.club.image}
              className="rounded img-fluid w-100 mb-0"
              id="header-image"
              alt={props.club.name}
            />
            <div className="w-100 position-absolute my-0 mx-0">
              <h1>{props.club.name}</h1>
              <h3>Category: {props.club.category}</h3>
              <h3>
                Location: {props.club.next_mtg_city},{" "}
                {props.club.next_mtg_country}
              </h3>
            </div>
          </div>
          <div>
            <div className="row mt-5">
              <div className="col-4">

            {
                props.user 
                ? props.club.members.map((m) => m.id).includes(props.user.id)
                    ? null
                    : <button type="button" className="btn btn-outline-light mb-3" onClick={(e) => canJoin(props.club)}>
                    JOIN
                    </button>
                : <button type="button" className="btn btn-outline-light mb-3" onClick={redirect}>
                JOIN
                </button>
            }

                <h2>Members</h2>
                <div>
                  <MembersList club={props.club} />
                </div>
              </div>
              <div className="col-8">
                <NextMeetingInfo
                  club={props.club}
                  clubBooks={props.clubBooks}
                />
              </div>

              <div className="col-4"></div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <ClubBookshelf club={props.club} clubBooks={props.clubBooks} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

export default SingleClubView;
