import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Local from './helpers/Local';
import Api from './helpers/Api';

import LoginView from './views/LoginView';


function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
        Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
        setUser(myresponse.data.user);
        setLoginErrorMsg('');
        navigate('/');
    } else {
        setLoginErrorMsg('Login failed');
    }
}

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
          <LoginView 
            loginCb={(u, p) => doLogin(u, p)} 
            loginError={loginErrorMsg} 
            />
         } />
      </Routes>
    </div>
  );
}

export default App;
