import React, { useEffect, useState } from "react";
import "./HomeView.css";
import Carousel4Wide from "../components/Carousel4Wide";
import TopBooks from "../components/TopBooks";

function HomeView(props) {
  return (
    <div className="homePage">
      <div className="logo">
        <img src="https://i.imgur.com/tMhxVJ8.png" />
      </div>

      <div className="clubCarousel">
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
        <div className="buttonArea">
          <h1> Want to find a book club?</h1>
          <a type="button" className="btn btn-light" href="login">
            Join!
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
