import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Api from "../helpers/Api";
import "./SingleClubView.css";

function SingleClubView(props) {
  let { clubId } = useParams();

  return (
    <div className="SingleClubView mt-0">
      {props.club.name ? (
        <div className="card text-bg-dark w-100">
          <img
            src={props.club.image}
            id="header-img"
            style={{ height: "18rem" }}
            className="card-img mb-0"
            alt={props.club.name}
          />
          <div className="card-img-overlay">
            <h1 className="card-title">{props.club.name}</h1>
            <h3 className="card-subtitle lh-lg">
              Category: {props.club.category}
            </h3>
            <h3 className="card-subtitle lh-lg">
              Location: {props.club.next_mtg_city},{" "}
              {props.club.next_mtg_country}
            </h3>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
      <div>
        <div className="row mt-4">
          <div className="col-4 border">
            <h2 className="mt-3 mb-4">Members</h2>
            <div>
              <MembersList club={props.club} />
            </div>
          </div>
          <div className="col-8 ps-3 pe-0">
            <NextMeetingInfo club={props.club} clubBooks={props.clubBooks} />
          </div>

          <div className="col-4"></div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <ClubBookshelf clubBooks={props.clubBooks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleClubView;
