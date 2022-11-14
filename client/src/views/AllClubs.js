import React from "react";
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import ClubDashboardView from "./ClubDashboard";


function AllClubsView() {



return (
<div className="AllClubs">
            <h1>All Clubs</h1>

            <div className="ClubsList">

            <div className="container">
                <Link to={ClubDashboardView} className="btn">
                Club 1
                </Link>
            </div>
            </div>

            </div>
);

}

export default AllClubsView;