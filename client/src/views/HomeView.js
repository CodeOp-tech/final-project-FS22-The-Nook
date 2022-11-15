import React, {useEffect, useState,} from "react";
import './HomeView.css';
import Carousel4Wide from '../components/Carousel4Wide'
import TopBooks from '../components/TopBooks'


function HomeView() {



    return (
        <div classname="homePage">
        <div className="logo">
            <img src="https://i.imgur.com/tMhxVJ8.png"/></div>
        
        <div className="clubCarousel">
            <h1>Featured Clubs</h1>
      <Carousel4Wide /></div>


        <div className="favoriteBooks">
        <h1>Favorite Books</h1>
        <TopBooks/></div>


        <div classname="buttonArea">
          <h1> Want to find a book club?</h1>
            <button className="btn btn-light">Join!</button>
          </div>
          </div>
       
    );
    
}

export default HomeView;