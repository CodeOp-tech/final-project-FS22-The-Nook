import { LeafPoll, Result } from "react-leaf-polls";
import "react-leaf-polls/dist/index.css";
import React from "react";

function Poll(props) {
  let options = JSON.parse(props.currentClub.book_poll_info);

  // Persistent data array (typically fetched from the server)
  const resData = [
    { id: 0, text: options.book1.title, votes: 0 },
    { id: 1, text: options.book2.title, votes: 0 },
    { id: 2, text: options.book3.title, votes: 0 },
  ];

  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const customTheme = {
    // textColor: "black",
    mainColor: "#00B87B",
    backgroundColor: "rgb(255,255,255)",
    alignment: "center",
  };

  function vote(item: Result, results: Result[]) {
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

export default Poll;
