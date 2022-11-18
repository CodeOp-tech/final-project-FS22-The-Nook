import React, {useEffect, useState,} from "react";
import './HomeView.css';
import Carousel4Wide from '../components/Carousel4Wide'
import TopBooks from '../components/TopBooks'


function HomeView() {



    return (
        <div className="homePage">

        
        
        <div className="clubCarousel">
            <h1>Featured Clubs</h1>
      <Carousel4Wide />

      
      <a type="button" className="btn btn-responsive btn-outline-dark" href="/clubs">See All Clubs</a>
      </div>


        <div className="topBooks">
        <h1>Top Books</h1>
        <TopBooks/>
        <a type="button" className="btn btn-responsive btn-outline-dark" href="/books">See All Books</a></div>


        <div className="buttonArea">
            <div className="buttonArea">
          <h1> Want to find a book club?</h1>
            <a type="button" className="btn btn-light" href="login">Join!</a>
            </div>
          </div>

          </div>
       
    );
    
}

export default HomeView;