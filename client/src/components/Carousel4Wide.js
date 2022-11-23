import React, { useEffect, useState } from "react";
import "./Carousel4Wide.scss";
import { Link } from "react-router-dom";

function Carousel4Wide(props) {
  //carousel function
  let clubs = props.clubs;
  // const [featuredClubs, setFeaturedClubs] = useState([]);
  //when page loads do this
  useEffect(() => {
    props.getClubs();
  }, []);

  // when the clubs var changes, call do init
  useEffect(() => {
    doInit();
    // selectClubs(clubs);
  }, [clubs]);

  // function selectClubs(clubs) {
  //   if (clubs.length > 0) {
  //     const shuffled = clubs.sort(() => 0.5 - Math.random());
  //     setFeaturedClubs(shuffled.slice(0, 5));
  //   }
  // }

  function doInit() {
    let items = document.querySelectorAll(".carouselWide .carouselWide-item");
    // console.log("items", items);
    // let selectedItems = [];

    // for (let item of items) {
    //   if (featuredClubs.includes((c) => c.id === item.id)) {
    //     selectedItems.push(item);
    //   }
    // }
    // console.log("selecteditems", selectedItems);


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

  // if (featuredClubs) {
  return (
    <>
    <div className="Carousel4Wide">
      <div className="container text-center my-3 carouselContainer">
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="clubCarousel"
            className=" carouselWide carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              {clubs.map((c, ix) => (
                <div
                  key={c.id}
                  className={`carouselWide-item carousel-item ${ix === 0 ? "active" : null}`}>
                  <div className="col-md-3">
                    <div className="card carouselCard d-flex flex-column align-items-center">
                      <div className="card-img">
                        <img src={c.image} className="img-fluid" alt="" />
                      </div>
                      <div className="card-img-overlay">
                        {props.user ? (
                          <Link to={`/clubs/${c?.id}`} className="clubName">
                            {c?.name}
                          </Link>
                        ) : (
                          <h3 className="clubName">{c?.name}</h3>
                        )}
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

    <div id="carouselSmall" className="carousel slide container" data-bs-ride="carousel">
    <div class="carousel-inner">
      {clubs.map((c, ix) => (
                    <div
                      key={c.id}
                      className={`carousel-item ${ix === 0 ? "active" : null}`}>
            
                          <img src={c.image} className="d-block w-100 container" alt="" />
                          <div className="carousel-caption d-md-block">
                            <p  className="carousel-text">
                            <Link to={`/clubs/${c?.id}`}>
                              {c?.name}
                            </Link>
                            </p>
                          </div>
                   
                
                     </div>
                  ))}
  </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselSmall" data-bs-slide="prev">
          <span class="bi-arrow-left-circle" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next " type="button" data-bs-target="#carouselSmall" data-bs-slide="next">
          <span class="bi-arrow-right-circle" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
</div>
    </>
  );
}

export default Carousel4Wide;
