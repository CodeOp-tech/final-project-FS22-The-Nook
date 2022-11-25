import React from "react";
import AddMeetingForm from "../components/AddMeetingForm";

import PollOptionsForm from "../components/PollOptionsForm";
import "./ClubAdminView.scss";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView container  text-center">
      <div className="row ">
        <div className="AddMeetingArea col-8 mt-2 px-4 ">
          <h2>Add your next meeting</h2>
          <AddMeetingForm
            postBookAndPatchClubCb={props.postBookAndPatchClubCb}
            clubs={props.clubs}
          />
        </div>

        <div className="AddPollArea col-4 mt-2 px-1">
          <h2 className="newPollHeader">
            Set the next books for your club to vote on
          </h2>
          <PollOptionsForm addBookPollOptionsCb={props.addBookPollOptionsCb} />
        </div>
      </div>
    </div>
  );
}

export default ClubAdminView;
