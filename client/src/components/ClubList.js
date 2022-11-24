import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ClubList.css";

function ClubList(props) {
  const navigate = useNavigate();


  return (
    <div className="container mt-5 mt-md-0">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {props.clubs.map((c) => (
          <div class="col">
            <div class="card h-100">
              <img src={c.image} class="card-img-top" alt={c.name} />
              <div class="card-body">
                <h5 class="card-title">{c.name}</h5>
                <p class="card-text">
                  <b>Genre:</b> {c.category}
                  <br></br>
                  <b>Location:</b> {c.next_mtg_city}, {c.next_mtg_country}
                  <br></br>
                  <b>Members:</b> {c.membersCount}
                </p>
                <div>
                  {props.user ? (
                    <Link to={`./${c.id}`}><button
                      className="btn btn-outline-dark btn-sm info-button mt-auto"
                      type="button"
                    >
                      More Info
                    </button></Link>
                  ) : (
                    <button
                      className="btn btn-outline-dark btn-sm info-button mt-auto"
                      type="button"
                      onClick={(e) => navigate(`/login`)}
                    >
                      Log in for More Info
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubList;
