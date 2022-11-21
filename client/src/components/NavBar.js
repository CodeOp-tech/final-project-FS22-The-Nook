import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";


function NavBar(props) {
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">

        {/* logo */}
        <a href="/" class="navbar-brand">
          <img
            src="https://media4.giphy.com/media/khVofmhxrgVz4RsWv5/giphy.gif?cid=790b7611e80fc692840444e963e13c27831ec227f6566f23&rid=giphy.gif&ct=g"
            className="img-responsive"
            alt="thenooklogogreen"
          />
        </a>

        {/* collapse navbar button */}
        <button
          type="button"
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        {/* navbar items left */}
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav">
            <a href="/" class="nav-item nav-link ">
              Home
            </a>
            <a href="/clubs" class="nav-item nav-link">
              Clubs
            </a>
            <a href="/books" class="nav-item nav-link">
              Books
            </a>

{/* profile link showing up only if logged in */}
            {props.user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                  Profile
                </NavLink>
              </li>
            ) : null}
          </div>


{/* navbar items right */}
{/*     log in/ log out showing up depending on user       */} 

          <div class="navbar-nav ms-auto">
            {props.user ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  {/* Log out user. Then go to home page. */}
                  <Link className="nav-link" to="/" onClick={props.logoutCb}>
                    Log Out
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
        </div>
      </div>
    </nav>

  );
}

export default NavBar;
