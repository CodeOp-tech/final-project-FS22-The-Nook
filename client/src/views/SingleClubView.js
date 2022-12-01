import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Poll from "../components/Poll";
import "./SingleClubView.scss";
import Local from "../helpers/Local";

function SingleClubView(props) {
  const navigate = useNavigate();
  let { id } = useParams();

  const [currentClub, setCurrentClub] = useState(
    props.clubs.find((c) => +c.id === +id)
  );

  useEffect(() => {
    props.fetchClubBooksCb(id);

    setCurrentClub(props.clubs.find((c) => +c.id === +id));
  }, [id, props.clubs]);

  useEffect(() => {
    props.getClubs();
  }, []);

  function redirect() {
    navigate("/login");
  }

  async function canJoin(currentClub) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentClub),
    };

    // add token to the header if it exists in local storage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`/clubs/${currentClub.id}`, options);
      if (response.ok) {
        let json = await response.json();
        props.setUser(json);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  if (!currentClub) {
    return <h2>Loading</h2>;
  }

  let user = JSON.parse(localStorage.getItem("user"));
  let userMember =
    currentClub && currentClub.membersList.some((m) => m.id === user.id);
  let userMemberAdmin = 0;

  let pollInfo = JSON.parse(currentClub.book_poll_info);

  if (userMember) {
    userMemberAdmin = currentClub.membersList.find(
      (m) => m.id === user.id
    ).admin;
  }

  return (
    <div className="SingleClubView mt-5">
      {userMemberAdmin ? (
        <Link
          to={`/clubs/${id}/club-admin`}
          className="btn btn-outline-dark mx-2 mt-4 btn-sm user"
        >
          <h4 className="mb-0">CLUB ADMIN</h4>
        </Link>
      ) : null}

      {currentClub.name ? (
        <div className="card text-bg-dark w-100">
          <img
            src={currentClub.image}
            id="header-img"
            style={{ height: "18rem" }}
            className="card-img mb-0"
            alt={currentClub.name}
          />
          <div className="card-img-overlay ">
            <h1 className="card-title clubViewCard">{currentClub.name}</h1>
            <h3 className="card-subtitle lh-lg">
              <b>Category: </b>
              <span className="club-category">{currentClub.category}</span>
            </h3>
            <h3 className="card-subtitle lh-lg">
              <b>Location:</b> {currentClub.next_mtg_city},{" "}
              {currentClub.next_mtg_country}
            </h3>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}

      <div className="container singleClubContainer">
        <div className="row mt-5 d-flex justify-content-start">
          <div className="col-4 ">
            {props.user ? (
              currentClub.membersList
                .map((m) => m.id)
                .includes(props.user.id) ? null : currentClub.membersList
                  .length >= 5 ? (
                <div>
                  <p>
                    Club is full.<br></br> Consider starting a new club instead.
                  </p>
                  <Link to="/clubs">
                    <button
                      type="button"
                      className="btn btn-outline-dark btn-sm new-button mt-auto mb-3"
                    >
                      Create a new club
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-responsive btn-outline-dark mb-3"
                  onClick={(e) => canJoin(currentClub)}
                >
                  JOIN
                </button>
              )
            ) : (
              <button
                type="button"
                className="btn btn-light mb-3"
                onClick={redirect}
              >
                JOIN
              </button>
            )}

            <div>
              <MembersList currentClub={currentClub} />
            </div>
          </div>

          <div className="col-8">
            <div className="row d-flex justify-content-start">
              <NextMeetingInfo
                clubBooks={props.clubBooks}
                currentClub={currentClub}
              />
            </div>
          </div>

          {pollInfo && userMember ? (
            <div className="col-10 col-auto mx-auto">
              <Poll currentClub={currentClub} setCurrentClub={setCurrentClub} />
            </div>
          ) : null}

          <div className="col-4"></div>
        </div>
        <div className="row">
          <div className="col">
            <ClubBookshelf
              clubBooks={props.clubBooks}
              currentClub={currentClub}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleClubView;
