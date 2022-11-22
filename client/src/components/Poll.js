import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import React from "react";
import Api from "../helpers/Api";

function Poll(props) {
  let options = JSON.parse(props.currentClub.book_poll_info);
  console.log("options", options);

  // Persistent data array (typically fetched from the server)
  const resData = [
    { id: 0, text: options[0].text, votes: 0 },
    { id: 1, text: options[1].text, votes: 0 },
    { id: 2, text: options[2].text, votes: 0 },
  ];

  const customTheme = {
    // textColor: "black",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  async function addVote() {
    let myresponse = await Api.patchClub(pollFormData);
    if (myresponse.ok) {
      //   props.getClubsCb();
      navigate(`/clubs/${id}`);
    }
  }

  function vote(item: Result, results: Result[]) {
    console.log("hi");
    console.log("item", item);
    console.log("results", results);

    // Here you probably want to manage
    // and return the modified data to the server.
  }

  return (
    <div className="container Poll">
      <h2>Vote on our next read!</h2>
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
