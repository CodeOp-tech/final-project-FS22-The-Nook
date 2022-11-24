import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClubList.css";

function ClubList(props) {
  const navigate = useNavigate();

  function redirect(clubId) {
    navigate(`./${clubId}`);
  }

  return (
    <div className="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
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
                    <button
                      className="btn btn-outline-dark btn-sm info-button mt-auto py-0 "
                      type="button"
                      onClick={(e) => redirect(c.id)}
                    >
                      More Info
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-dark btn-sm moreinfo-button mt-auto py-0 "
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
