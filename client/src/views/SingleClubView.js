import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";

function SingleClubView(props) {
  let { id } = useParams();
  const [club, setClub] = useState([]);

  useEffect(() => {
    getClub();
  }, []);

  async function getClub() {
    let myresponse = await Api.getClub(`${id}`);
    if (myresponse.ok) {
      setClub(myresponse.data);
      setErrorMsg("");
    } else {
      setClub([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  return (
    <div className="SingleClubView">
      <ClubBookshelf club={club} />
    </div>
  );
}

export default SingleClubView;
