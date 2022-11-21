import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import ErrorView from "./views/ErrorView";

import ProfileView from "./views/ProfileView";
import EditProfileView from "./views/EditProfileView";

import AllBooksView from "./views/AllBooksView";

import HomeView from "./views/HomeView";

import ClubAdminView from "./views/ClubAdminView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ClubSearchView from "./views/ClubSearchView";
import SingleClubView from "./views/SingleClubView";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [userInfo, setUserInfo] = useState({});
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  // const [club, setClub] = useState({});
  // const [errorMsg, setErrorMsg] = useState("");
  // const [clubBooks, setClubBooks] = useState([]);

  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserInfo();
    getClubs();
    // fetchClub();
  }, [user]);

  async function getUserInfo() {
    if (user) {
      let response = await Api.getUser(user.id);
      setUserInfo(response.data);
    } else setUserInfo(null);
  }

  //get the clubs first
  async function getClubs() {
    setLoading(true);
    setError("");

    try {
      let response = await fetch(`/clubs`);
      if (response.ok) {
        let data = await response.json();
        setClubs(data);
      } else {
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  console.log("clubs", clubs);

  // useEffect(() => {
  //   fetchClubBooks(id);
  // }, []);

  // async function fetchClub(id) {
  //   let myresponse = await Api.getClub(id);
  //   if (myresponse.ok) {
  //     setClub(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setClub([]);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  // async function fetchClubBooks(clubId) {
  //   let myresponse = await Api.getClubBooks(`${clubId}`);
  //   if (myresponse.ok) {
  //     setClubBooks(myresponse.data);
  //     setErrorMsg("");
  //   } else {
  //     setClubBooks([]);
  //     let msg = `Error ${myresponse.status}: ${myresponse.error}`;
  //     setErrorMsg(msg);
  //   }
  // }

  const postBookAndPatchClub = async (meetingDetails, bookData) => {
    let responsePatch = await Api.patchClub(meetingDetails);
    if (responsePatch.ok) {
      setClubs(responsePatch.data);
      setClub(responsePatch.data[meetingDetails.club_id - 1]);
    }
    let responsePostBook = await Api.postBook(bookData);
    // if (responsePostBook.ok) {
    //   let getClubBooks = await Api.getClubBooks(`${meetingDetails.club_id}`);
    //   if (getClubBooks.ok) {
    //     setClubBooks(getClubBooks.data);
    //   }
    navigate(`/clubs/${meetingDetails.club_id}`);
    // }
  };

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(
        {
          username: myresponse.data.user.username,
          id: myresponse.data.user.id,
        },
        myresponse.data.token
      );
      setUser(myresponse.data.user);

      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUserInfo(null);
    setUser(null);
  }

  function registerUser(newUser) {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          doLogin(newUser.username, newUser.password);
        }
      })
      .catch((error) => {
        console.log(`Server error: ${error.message}`);
      });
  }

  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />{" "}
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={<HomeView clubs={clubs} getClubs={getClubs} />}
          />

          <Route path="/books" element={<AllBooksView />} />

          <Route
            path="/login"
            element={
              <LoginView
                loginCb={(u, p) => doLogin(u, p)}
                loginError={loginErrorMsg}
              />
            }
          />

          <Route
            path="/register"
            element={
              <RegisterView registerUser={(newUser) => registerUser(newUser)} />
            }
          />
          <Route
            path="/users/:userId"
            element={
              <PrivateRoute>
                <ProfileView user={userInfo} />
              </PrivateRoute>
            }
          />

          <Route
            path="/users/:userId/edit"
            element={
              <EditProfileView
                user={userInfo}
                setUser={(user) => setUserInfo(user)}
                clubs={clubs}
                setClubs={setClubs}
              />
            }
          />

          <Route
            path="/clubs/:id"
            element={
              <SingleClubView
                clubs={clubs}
                // club={club}
                // setClubCb={setClub}
                getClubs={getClubs}
                // clubBooks={clubBooks}
                // fetchClubBooksCb={fetchClubBooks}
                // fetchClubCb={fetchClub}
                user={user}
                setUser={(user) => setUser(user)}
              />
            }
          />
          <Route
            path="/clubs/:id/club-admin"
            element={
              <ClubAdminView
                clubs={clubs}
                // setClubCb={setClub}
                // setClubBooksCb={setClubBooks}
                postBookAndPatchClubCb={postBookAndPatchClub}
              />
            }
          />
          <Route
            exact
            path="/clubs"
            element={
              <ClubSearchView user={user} setUser={(user) => setUser(user)} />
            }
          />

          <Route
            path="*"
            element={<ErrorView code="404" text="Page not found" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
