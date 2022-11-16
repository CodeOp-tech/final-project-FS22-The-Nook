import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import NextMeetingInfo from "../components/NextMeetingInfo";
import ClubAdminView from "./ClubAdminView";
import Api from "../helpers/Api";

function SingleClubView(props) {
  //   let { id } = useParams();
  const [club, setClub] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [clubBooks, setClubBooks] = useState({});
  const [nextMeeting, setNextMeeting] = useState({});
  let id = 1; // TODO: remove hardcoding when able
  console.log("nextmtg", nextMeeting);

  useEffect(() => {
    fetchClub(id);
    fetchClubBooks();
  }, []);

  //Get clubs's books
  async function fetchClubBooks() {
    let myresponse = await Api.getClubBooks(`${club.id}`);
    if (myresponse.ok) {
      setClubBooks(myresponse.data);
      setErrorMsg("");
    } else {
      setClubBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  async function fetchClub(id) {
    let myresponse = await Api.getClub(id);
    if (myresponse.ok) {
      setClub(myresponse.data);
      setErrorMsg("");
    } else {
      setClub([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  function updateNextMeeting(nextMeeting) {
    setNextMeeting(nextMeeting);
  }

  if (!club) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="SingleClubView">
      <Outlet updateNextMeetingCb={updateNextMeeting} />
      <h2>{club.name}</h2>
      <h3>{club.category}</h3>
      <NextMeetingInfo
        club={club}
        clubBooks={clubBooks}
        nextMeeting={nextMeeting}
      />
      <ClubBookshelf club={club} />
    </div>
  );
}

export default SingleClubView;
