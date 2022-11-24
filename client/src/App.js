import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
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
import ContactView from "./views/ContactView";
import SingleBookView from "./views/SingleBookView";

import Local from "./helpers/Local";
import Api from "./helpers/Api";

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [userInfo, setUserInfo] = useState(null);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [clubBooks, setClubBooks] = useState([]);

  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    getUserInfo();
    getClubs();
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

  async function fetchClubBooks(id) {
    let myresponse = await Api.getClubBooks(`${id}`);
    if (myresponse.ok) {
      setClubBooks(myresponse.data);
      setErrorMsg("");
    } else {
      setClubBooks([]);
      let msg = `Error ${myresponse.status}: ${myresponse.error}`;
      setErrorMsg(msg);
    }
  }

  const postBookAndPatchClub = async (meetingDetails, bookData) => {
    let responsePatch = await Api.patchClub(meetingDetails);
    if (responsePatch.ok) {
      setClubs(responsePatch.data);
    }
    let responsePostBook = await Api.postBook(bookData);
    if (responsePostBook.ok) {
      let getClubBooks = await Api.getClubBooks(`${meetingDetails.club_id}`);
      if (getClubBooks.ok) {
        setClubBooks(getClubBooks.data);
      }
      navigate(`/clubs/${meetingDetails.club_id}`);
    }
  };

 

  async function addBookPollOptions(pollFormData) {
    let myresponse = await Api.patchClub(pollFormData);
    if (myresponse.ok) {
      setClubs(myresponse.data);
      navigate(`/clubs/${pollFormData.club_id}`);
    }
  }

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
            element={<HomeView clubs={clubs} getClubs={getClubs} user={user} />}
          />

          <Route path="/books/all/" element={<AllBooksView user={user}  />} />

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
                getClubs={getClubs}
                clubBooks={clubBooks}
                fetchClubBooksCb={fetchClubBooks}
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
                addBookPollOptionsCb={addBookPollOptions}
                postBookAndPatchClubCb={postBookAndPatchClub}
              />
            }
          />
          <Route
            exact
            path="/clubs"
            element={
              <ClubSearchView
                user={user}
                setUser={(user) => setUser(user)}
                getClubs={getClubs}
              />
            }
          />

          <Route
            path="/books/all/:id"
            element={
              <SingleBookView
                  user={user}
              />
            }
          />

          <Route
            path="*"
            element={<ErrorView code="404" text="Page not found" />}
          />

          <Route path="/contact" element={<ContactView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
