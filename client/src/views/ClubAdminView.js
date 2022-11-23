import React from "react";
import AddMeetingForm from "../components/AddMeetingForm";

import PollOptionsForm from "../components/PollOptionsForm";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">
      <div className="AddBookArea">
        <h2>Add your next meeting</h2>
        <AddMeetingForm
          postBookAndPatchClubCb={props.postBookAndPatchClubCb}
          clubs={props.clubs}
        />
      </div>
      <div>
        <h2>Set the next books for your club to vote on.</h2>
        <PollOptionsForm addBookPollOptionsCb={props.addBookPollOptionsCb} />
      </div>
    </div>
  );
}

export default ClubAdminView;
