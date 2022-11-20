import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Api from "../helpers/Api";
import "./SingleClubView.css";
import { useNavigate } from "react-router-dom";
import Local from "../helpers/Local";

function SingleClubView(props) {
  const [clubBooks, setClubBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  let { clubId } = useParams();
  let ix = clubId - 1;
  const user = JSON.parse(localStorage.getItem("user"));
  let admin = props.clubs[ix].membersList.find((m) => m.id === user.id).admin;
  console.log("clubs", props.clubs);
  console.log("clubId", clubId);

  const navigate = useNavigate();

  function redirect() {
    navigate("/login");
  }

  async function canJoin(club) {
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(club),
    };

    // add token to the header if it exists in local storage
    let token = Local.getToken();
    if (token) {
      options.headers["Authorization"] = "Bearer " + token;
    }

    try {
      let response = await fetch(`/clubs/${club.id}`, options);
      if (response.ok) {
        let json = await response.json();
        props.setUser(json);
        console.log(
          "this is the reply the client receives from the backend and saves it as user:",
          json
        );
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }
  useEffect(() => {
    fetchClubBooks(clubId);
  }, []);

  async function fetchClubBooks(clubId) {
    let myresponse = await Api.getClubBooks(`${clubId}`);
    if (myresponse.ok) {
      setClubBooks(myresponse.data);
      setErrorMsg("");
    } else {
      setClubBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  return (
    <div className="SingleClubView mt-0">
      {admin ? (
        <Link
          to={`/clubs/club-admin/${clubId}`}
          className="btn btn-outline-light mx-2 btn-sm user"
        >
          <h4 className="mb-0">CLUB ADMIN</h4>
        </Link>
      ) : null}

      {props.clubs[ix].name ? (
        <div className="card text-bg-dark w-100">
          <img
            src={props.clubs[ix].image}
            id="header-img"
            style={{ height: "18rem" }}
            className="card-img mb-0"
            alt={props.clubs[ix].name}
          />
          <div className="card-img-overlay">
            <h1 className="card-title">{props.clubs[ix].name}</h1>
            <h3 className="card-subtitle lh-lg">
              Category: {props.clubs[ix].category}
            </h3>
            <h3 className="card-subtitle lh-lg">
              Location: {props.clubs[ix].next_mtg_city},{" "}
              {props.clubs[ix].next_mtg_country}
            </h3>
          </div>
        </div>
      ) : (
        <h2>Loading</h2>
      )}
      <div>
        <div className="row mt-5">
          <div className="col-4">
            {props.user ? (
              props.club.members
                .map((m) => m.id)
                .includes(props.user.id) ? null : props.club.members.length >=
                10 ? (
                <p>club is full</p>
              ) : (
                <button
                  type="button"
                  className="btn btn-outline-light mb-3"
                  onClick={(e) => canJoin(props.club)}
                >
                  JOIN
                </button>
              )
            ) : (
              <button
                type="button"
                className="btn btn-outline-light mb-3"
                onClick={redirect}
              >
                JOIN
              </button>
            )}
            <h2>Members</h2>
            <div>
              <MembersList club={props.club} />
            </div>
          </div>
          <div className="col-8">
            <NextMeetingInfo club={props.club} clubBooks={props.clubBooks} />
          </div>

          <div className="col-4"></div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <ClubBookshelf clubBooks={clubBooks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleClubView;
