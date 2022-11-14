import React from "react";
import AddClubBook from "../components/AddClubBook";

function ClubAdminView(props) {
  return (
    <div className="ClubAdminView">
      <h2>Add your next book</h2>
      <AddClubBook />
    </div>
  );
}

export default ClubAdminView;
