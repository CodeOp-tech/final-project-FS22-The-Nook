import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import Api from "../helpers/Api";
import "./SingleClubView.css";

function SingleClubView(props) {
  let { clubId } = useParams();
  // const [club, setClub] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  // const [clubBooks, setClubBooks] = useState({});
  // let id = 1; // TODO: remove hardcoding when able

  // console.log("club", club);
  // console.log("clubBooks", clubBooks);

  // useEffect(() => {
  //   props.fetchClub(clubId);
  // }, [props.clubBooks]);

  // useEffect(() => {
  //   props.fetchClubBooks(clubId);
  // }, [props.club]);

  //Get clubs's books
  // async function fetchClubBooks() {
  //   let myresponse = await Api.getClubBooks(`${id}`); //TODO: Change to ${club.id}
  //   if (myresponse.ok) {
  //     setClubBooks(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setClubBooks([]);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  // async function fetchClub(id) {
  //   let myresponse = await Api.getClub(id);
  //   if (myresponse.ok) {
  //     setClub(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setClub([]);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  // if (!props.club.name) {
  //   console.log("loading", props.club);
  //   return <h2>Loading</h2>;
  // }
  return (
    <div className="SingleClubView">
      {props.club.name ? (
        <div>
          <h2>{props.club.name}</h2>
          <h3>{props.club.category}</h3>
          <NextMeetingInfo club={props.club} clubBooks={props.clubBooks} />
          <ClubBookshelf club={props.club} clubBooks={props.clubBooks} />
        </div>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

export default SingleClubView;
