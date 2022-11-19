import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import MembersList from "../components/MembersList";
import Api from "../helpers/Api";
import "./SingleClubView.css";

function SingleClubView(props) {
  const [clubBooks, setClubBooks] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  let { clubId } = useParams();
  let ix = clubId - 1;
  console.log("clubs", props.clubs);
  console.log("clubId", clubId);

  useEffect(() => {
    fetchClubBooks(clubId);
  }, [clubId]);

  async function fetchClubBooks(club) {
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
      <Link
        to={`/clubs/club-admin/${clubId}`}
        className="btn btn-outline-light mx-2 btn-sm user"
      >
        <h4>CLUB ADMIN</h4>
      </Link>
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
        <div className="row mt-4">
          <div className="col-4 border">
            <h2 className="mt-3 mb-4">Members</h2>
            <div>
              <MembersList clubs={props.clubs} />
            </div>
          </div>
          <div className="col-8 ps-3 pe-0">
            <NextMeetingInfo clubs={props.clubs} clubBooks={clubBooks} />
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
