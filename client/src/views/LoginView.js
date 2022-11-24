import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginView.scss";

function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "usernameInput":
        setUsername(value);
        break;
      case "passwordInput":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.loginCb(username, password);
  }

  return (
    <div className="Login">
      <div className="container container-login">
        <h2 className="title">Login</h2>

        {props.loginError && (
          <div className="alert alert-danger">{props.loginError}</div>
        )}

        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="col-auto">
            <label>Username</label>
            <input
              className="form-control form-control-sm loginInputsFields"
              type="text"
              name="usernameInput"
              required
              value={username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              className="form-control form-control-sm loginInputsFields"
              type="password"
              name="passwordInput"
              required
              value={password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-dark btn-sm login-button"
          >
            Submit
          </button>

          <p>Don't have an account yet? </p>

          <a
            type="button"
            className="btn btn-outline-dark btn-sm signup-button"
            href="/register"
          >
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
