import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./ClubList.css";

function ClubList(props) {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 mt-md-0">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        {props.clubs.map((c) => (
          <div className="col">
            <div className="card h-100">
              <img src={c.image} className="card-img-top" alt={c.name} />
              <div className="card-body">
                <h5 className="card-title">{c.name}</h5>
                <p className="card-text">
                  <b>Genre:</b> {c.category}
                  <br></br>
                  <b>Location:</b> {c.next_mtg_city}, {c.next_mtg_country}
                  <br></br>
                  <b>Members:</b> {c.membersCount}
                </p>
                <div>
                  {props.user ? (
                    <Link to={`./${c.id}`}>
                      <button
                        className="btn btn-outline-dark btn-sm info-button mt-auto"
                        type="button"
                      >
                        More Info
                      </button>
                    </Link>
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
