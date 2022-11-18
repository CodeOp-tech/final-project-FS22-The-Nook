import React from "react";
import AddClubBook from "../components/AddClubBook";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">

      <div className="AddBookArea">
      <h2>Add your next book</h2>
      <AddClubBook />
    </div>

    <div className="CreateClubArea">
      <h2>Create a new book club</h2>
      <CreateClub/>
    </div>

    </div>
  );
}

export default ClubAdminView;
