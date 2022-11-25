import React, { useEffect, useState } from "react";
import "./HomeView.scss";
import Carousel4Wide from "../components/Carousel4Wide";
import TopBooks from "../components/TopBooks";

function HomeView(props) {
  return (
    <div className="homePage mt-5">
      <div className="buttonArea">
        {props.user ? (
          <div className="buttonAreaFind">
            <h1>Welcome to the Nook!</h1>
            <img src="TheNookLogo.png" alt="The Nook logo" />
            <h2 className="theNookMission">
              For avid readers who want to connect with fellow bookworms, The
              Nook is a community hub that makes it easier to create, manage,
              and join a book club.
            </h2>
            <a
              type="button"
              className="btn btn-responsive btn-outline-dark"
              href="/clubs"
            >
              All Clubs
            </a>
          </div>
        ) : (
          <div className="buttonAreaJoin ">
            <h1>Welcome to the Nook!</h1>
            <img src="TheNookLogo.png" alt="The Nook logo" />
            <h2 className="theNookMission">
              For avid readers who want to connet with fellow bookworms, The
              Nook is a community hub that makes it easier to create, manage,
              and join a book club.
            </h2>
            <a
              type="button"
              className="join-button btn btn-responsive btn-outline-dark"
              href="/register"
            >
              Join The Nook!
            </a>
          </div>
        )}
      </div>

      <div className="clubCarousel container-fluid">
        <h1>Featured Clubs</h1>
        <Carousel4Wide
          clubs={props.clubs}
          getClubs={props.getClubs}
          user={props.user}
        />

        <a
          type="button"
          className="btn btn-responsive btn-outline-dark clubsHomeViewbtn"
          href="/clubs"
        >
          See All Clubs
        </a>
      </div>

      <div className="topBooks mb-5">
        <h1>Our Members Are Loving</h1>
        <TopBooks />
        <a
          type="button"
          className="btn btn-responsive btn-outline-dark booksHomeViewbtn"
          href="/books/all"
        >
          See All Books
        </a>
      </div>
    </div>
  );
}

export default HomeView;
