import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css"
import HomeView from "../views/HomeView";

function NavBar(props) {
  return (
    <nav
      className="Navbar navbar navbar-expand-sm navbar-dark mb-2"
      
    >
      <div className="container-fluid">

      <a className="navbar-brand" href="/" ><img src="https://i.imgur.com/FRh3Vql.png" className="img-responsive" alt="thenooklogogreen"/>
      </a>

        

        {/* Left-aligned stuff */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
            <NavLink className="nav-link" to="clubs">
                Clubs
              </NavLink>
              </li>

              <li className="nav-item">
            <NavLink className="nav-link" to="/books">
                Books
              </NavLink>
              </li>
              {props.user? 
              <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                Profile
              </NavLink>
            </li> : null
            }
          </ul>

          
        </div>

        {/* Right-aligned stuff, based on whether user is logged in */}
        {props.user ? (
          <ul className="navbar-nav">
            {/* <li className="nav-item">
              <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                Profile ({props.user.username})
              </NavLink>
            </li> */}
            <li className="nav-item">
              {/* Log out user. Then go to home page. */}
              <Link className="nav-link" to="/" onClick={props.logoutCb}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Log In / Register
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
