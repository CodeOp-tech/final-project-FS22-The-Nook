import React from "react";
//import AddMeetingForm from "../components/AddMeetingForm";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">
      <div className="AddBookArea">
        <h2>Add your next meeting</h2>
        <AddMeetingForm
          setClubCb={props.setClubCb}
          setClubBooksCb={props.setClubBooksCb}
          postBookAndPatchClubCb={props.postBookAndPatchClubCb}
          club={props.club}
        />
      </div>

      {/* <div className="CreateClubArea">
        <h2>Create a new book club</h2>
        <CreateClub />
      </div> */}
    </div>
  );
}

export default ClubAdminView;
