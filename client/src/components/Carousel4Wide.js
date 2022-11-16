import React, { useEffect, useState } from "react";
import "./Carousel4Wide.css";
import ClubBookshelf from "./ClubBookshelf";
import ClubSearch from "./ClubSearch";
import { Link } from "react-router-dom";

function Carousel4Wide(props) {
  const [clubs, setClubs] = useState([]); //state 1
  const [loading, setLoading] = useState(false); //state2
  const [error, setError] = useState(""); //state 3

  async function getClubs() {
    setLoading(true);
    setError("");

    try {
      let response = await fetch("clubs");
      if (response.ok) {
        let data = await response.json();
        setClubs(data);
      } else {
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  //carousel

  //when page loads do this
  useEffect(() => {
    getClubs();
  }, []);

  //when the clubs var changes, call do init
  useEffect(() => {
    doInit();
  }, [clubs]);

  function doInit() {
    let items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }

  return (
    <div className="Carousel4Wide">
      <div className="container text-center my-3">
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="bookCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {/* <div className="carousel-item active">
                                      <div className="col-md-3">
                                    <div className="card carouselCard">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/84/e4/73/84e4732d07ffc571aee8abc261e2249a.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">
                                            <Link to={`/clubs/${clubs[0]?.id}`} className="clubName"  >{clubs[0]?.name}</Link></div>
                                    </div>
                                    </div>
                            </div> */}

              {
                clubs.map((c) => (
                  <div className="carousel-item active">
                    <div className="col-md-3">
                      <div className="card carouselCard">
                        <div className="card-img">
                          <img
                            src="https://i.pinimg.com/564x/84/e4/73/84e4732d07ffc571aee8abc261e2249a.jpg"
                            className="img-fluid"
                            alt=""
                          />
                        </div>
                        <div className="card-img-overlay">
                          <Link to={`/clubs/${c?.id}`} className="clubName">
                            {c?.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <a
              className="carousel-control-prev bg-transparent w-aut"
              href="#bookCarousel"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </a>
            <a
              className="carousel-control-next bg-transparent w-aut"
              href="#bookCarousel"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel4Wide;
