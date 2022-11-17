import React from "react";
import AddMeetingForm from "../components/AddMeetingForm";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">
      <h2>Add your next meeting</h2>
      <AddMeetingForm
        setClubCb={props.setClubCb}
        setClubBooksCb={props.setClubBooksCb}
        postBookCb={props.postBookCb}
        patchClubCb={props.patchClubCb}
        club={props.club}
      />
    </div>
  );
}

export default ClubAdminView;
