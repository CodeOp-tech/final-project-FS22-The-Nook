import React, { useEffect, useState } from "react";
import "./HomeView.scss";
import Carousel4Wide from "../components/Carousel4Wide";
import TopBooks from "../components/TopBooks";

function HomeView(props) {
  return (
    <div className="homePage">
      <div className="clubCarousel container-fluid">
        <h1>Featured Clubs</h1>
        <Carousel4Wide clubs={props.clubs} getClubs={props.getClubs} />

        <a
          type="button"
          className="btn btn-responsive btn-outline-dark"
          href="/clubs"
        >
          See All Clubs
        </a>
      </div>

      <div className="topBooks">
        <h1>Top Books</h1>
        <TopBooks />
        <a
          type="button"
          className="btn btn-responsive btn-outline-dark"
          href="/books"
        >
          See All Books
        </a>
      </div>



      <div className="buttonArea">
        {props.user ? (
          <div className="buttonAreaFind">
            <h1>Find more book clubs</h1>
            <a type="button" className="btn btn-light" href="/clubs">
              All Clubs
            </a>
          </div>
        ) : (
          <div className="buttonAreaJoin">
            <h1> Want to find a book club?</h1>
            <a type="button" className="btn btn-light" href="/register">
              Join!
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeView;
