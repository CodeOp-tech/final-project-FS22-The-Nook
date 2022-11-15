import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubBookshelf from "../components/ClubBookshelf";
import Api from "../helpers/Api";

function SingleClubView(props) {
  //   let { id } = useParams();
  const [club, setClub] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  let id = 2; // TODO: remove hardcoding when able
  console.log("params", id);
  console.log("club", club);

  useEffect(() => {
    fetchClub(id);
  }, []);

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
  if (!club) {
    return <h2>Loading</h2>;
  }
  return (
    <div className="SingleClubView">
      <h2>{club.name}</h2>
      <h3>{club.category}</h3>
      <ClubBookshelf club={club} />
    </div>
  );
}

export default SingleClubView;
