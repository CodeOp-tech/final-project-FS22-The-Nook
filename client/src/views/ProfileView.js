import React from "react";


function ProfileView() {
 

    return (
        <div className="ProfileView">
            <h1>Profile View</h1>

            <div className="UserInfo">
                <h2>Personal Info</h2>
            ID: 
           
            <br />
            Username:

            <br />
            Email:
        
            </div>

            <div className="JoinedClubs">
                <h2>Your Book Clubs</h2>
            </div>

            <div className="FavoriteBooks">
                <h2>Your Favorite Books</h2>
            </div>

            <div className="ReadBooks">
                <h2>Books You've Read</h2>
            </div>


        </div>
    );
}


export default ProfileView;