import React, { useEffect, useState } from "react";
import "./Carousel4Wide.css";
import { Link } from "react-router-dom";

function Carousel4Wide(props) {
  const [clubs, setClubs] = useState([]); //state 1
  const [loading, setLoading] = useState(false); //state2
  const [error, setError] = useState(""); //state 3

  //get the clubs first
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

  //carousel function

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
            id="clubCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {clubs.map((c, ix) => (
                <div
                  key={c.id}
                  className={`carousel-item ${ix === 0 ? "active" : null}`}>
                  <div className="col-md-3">
                    <div className="card carouselCard">
                      <div className="card-img">
                        <img src={c.image} className="img-fluid" alt="" />
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

            <div className="carouselControls">
              <a
                className="carousel-control-prev active bi-arrow-left-circle"
                href="#clubCarousel"
                role="button"
                data-bs-slide="prev"
              ></a>
              <a
                className="carousel-control-next bi-arrow-right-circle"
                href="#clubCarousel"
                role="button"
                data-bs-slide="next"
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel4Wide;
