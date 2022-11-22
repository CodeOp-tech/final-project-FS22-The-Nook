import React from "react";
import AddMeetingForm from "../components/AddMeetingForm";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">
      <div className="AddBookArea">
        <h2>Add your next meeting</h2>
        <AddMeetingForm
          setClubCb={props.setClubCb}
          setClubBooksCb={props.setClubBooksCb}
          postBookAndPatchClubCb={props.postBookAndPatchClubCb}
          clubs={props.clubs}
        />
      </div>
    </div>
  );
}

export default ClubAdminView;
