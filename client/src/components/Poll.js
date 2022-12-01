import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import React from "react";
import { useParams } from "react-router-dom";
import Api from "../helpers/Api";
import "./Poll.scss";

function Poll(props) {
  const { id } = useParams();
  let options = JSON.parse(props.currentClub.book_poll_info);
  console.log("options", options);

  // Persistent data array (typically fetched from the server)
  const resData = [
    {
      id: 0,
      text: options[0].text,
      votes: options[0].votes,
      percentage: options[0].percentage,
    },
    {
      id: 1,
      text: options[1].text,
      votes: options[1].votes,
      percentage: options[1].percentage,
    },
    {
      id: 2,
      text: options[2].text,
      votes: options[2].votes,
      percentage: options[2].percentage,
    },
  ];

  const customTheme = {
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  async function addVote(results) {
    let myresponse = await Api.patchClub(results);
    if (myresponse.ok) {
      let updatedClubInfo = myresponse.data.find((c) => +c.id === +id);
      props.setCurrentClub(updatedClubInfo);
      // navigate(`/clubs/${id}`);
    }
  }

  function vote(item, results) {
    console.log("hi");
    console.log("item", item);
    console.log("results", results);
    console.log("resData", resData);
    results.club_id = id;
    addVote(results);

    // Here you probably want to manage
    // and return the modified data to the server.
  }

  return (
    <div className="container Poll">
      <LeafPoll
        type="multiple"
        question="Which book should we read next?"
        results={resData}
        theme={customTheme}
        onVote={vote}
        isVoted={false}
      />
    </div>
  );
}

// Object keys may vary on the poll type (see the 'Theme options' table below)

export default Poll;
