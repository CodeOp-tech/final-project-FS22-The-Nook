import React, { useState } from "react";
import "./RegisterView.scss";

let EMPTY_FORM = {
  username: "",
  email: "",
  password: "",
};

function RegisterView(props) {
  let [newUser, setInput] = useState(EMPTY_FORM);

  function handleChange(event) {
    let { name, value } = event.target;
    setInput((newUser) => ({ ...newUser, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.registerUser(newUser);
  }

  return (
    <div>
      <div className="SignUp container container-register">
        <h2>Sign up</h2>
        <form className="mb-3" onSubmit={(e) => handleSubmit(e)}>
          <div className="col-auto">
            <label>Username</label>
            <input
              className="form-control form-control-sm registerInputsFields"
              type="text"
              name="username"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              className="form-control form-control-sm registerInputsFields"
              type="email"
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Password </label>
            <input
              className="form-control form-control-sm registerInputsFields"
              type="password"
              name="password"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-dark btn-sm register-button"
          >
            Create Account
          </button>
        </form>

        <p>Already have an account? </p>

        <a
          type="button"
          className="btn btn-outline-dark btn-sm signup-button"
          href="/login"
        >
          Log In
        </a>
      </div>
    </div>
  );
}

export default RegisterView;
