
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import ErrorView from './views/ErrorView';
import ProfileView from './views/ProfileView';
import AllBooksView from './views/AllBooksView';
import ClubAdminView from "./views/ClubAdminView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ClubSearchView from "./views/ClubSearchView";


import Local from "./helpers/Local";
import Api from "./helpers/Api";


function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg("");
      navigate("/");
    } else {
      setLoginErrorMsg("Login failed");
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  function registerUser(newUser){
      fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username: newUser.username, email: newUser.email, password: newUser.password})
      })
      .then((res) => {
        if(res.ok){
          doLogin(newUser.username, newUser.password)
        }
      })
        .catch(error => {
          console.log(`Server error: ${error.message}`)
        })
  }


  return (
    <div className="App">
      <NavBar user={user} logoutCb={doLogout} />
  `       <div className="container">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

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
            <RegisterView registerUser={newUser => registerUser(newUser)}/>
          }
        />
        <Route
          path="/users/:userId"
          element={
            <PrivateRoute>
              <ProfileView />
            </PrivateRoute>
          }
        />
        <Route path="club-admin" element={<ClubAdminView />} />
        <Route
          path="*"
          element={<ErrorView code="404" text="Page not found" />} />
        
        <Route path="/clubs" element={<ClubSearchView />} />
       

      </Routes>
      </div>
    </div>
    );
  }
         

export default App;
