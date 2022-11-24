import React, { useState } from "react";
import "./ContactView.scss";
import { send } from "emailjs-com";

let EMPTY_CONTACT_FORM = {
  firstname: " ",
  lastname: " ",
  email: " ",
  message: " ",
  checkbox: false,
};

function ContactView() {
  const [details, setDetails] = useState(EMPTY_CONTACT_FORM);

  const handleDetailsChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setDetails((state) => ({
      ...state,
      [name]: value,
    }));
  };

  function handleContactSubmit(e) {
    e.preventDefault();
    alert("Form information was sent correctly, thank you!");

    send("service_ilg3vrk", "template_x0nxqdw", details, "ZkeMx-qjSurPuwe4j")
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((err) => {
        console.log("FAILED...", err);
      });
    setDetails(EMPTY_CONTACT_FORM);
  }

  return (
    <div className="container contactContainer">
      <h2>Contact Us</h2>

      <div className="row">
        <div className="col-md contactUs">
          <h3>Where to find us:</h3>

          <div className="contactOptions">
            <div className="contactEmail">
              <p>
                <b>
                  <i className="bi bi-envelope-heart"></i> Email:
                </b>
                <br />
                thenookapp@gmail.com
              </p>
            </div>
            <br />

            <div className="contactPhone">
              <p>
                <i className="bi bi-telephone"></i>{" "}
                <b>
                  {" "}
                  Phone:
                  <br />
                </b>
                +34 648 491 591
              </p>
            </div>
            <br />

            <div className="contactAddress">
              <p>
                <i className="bi bi-buildings"></i>
                <b>
                  {" "}
                  Address:
                  <br />
                </b>{" "}
                Carrer d'en Grassot 101<br></br>08025
                <br />
                Barcelona
                <br />
                Spain
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg messageUs ">
          <div className="row-g3">
            <h3 className="col-lg-10">Send us a message:</h3>
            <form onSubmit={handleContactSubmit}>
              <div className="col-lg-10">
                <label
                  htmlFor="validationFirstName"
                  className="form-label contact-label"
                >
                  First name
                </label>
                <input
                  onChange={handleDetailsChange}
                  type="text"
                  className="form-control contact-input"
                  id="validationFirstName"
                  name="firstname"
                  value={details.firstname}
                  required
                />
              </div>
              <div className="col-lg-10">
                <label
                  htmlFor="validationLastName"
                  className="form-label contact-label"
                >
                  Last name
                </label>

                <input
                  onChange={handleDetailsChange}
                  type="text"
                  className="form-control contact-input"
                  id="validationLastName"
                  name="lastname"
                  value={details.lastname}
                  required
                />
              </div>

              <div className="col-md-10">
                <label
                  html="validationEmail"
                  className="form-label contact-label"
                >
                  Email
                </label>

                <input
                  onChange={handleDetailsChange}
                  type="text"
                  className="form-control contact-input"
                  id="validationEmail"
                  aria-describedby="inputGroupPrepend2"
                  name="email"
                  value={details.email}
                  required
                />
              </div>

              <div className="col-lg-10">
                <label
                  html="exampleFormControlTextarea1"
                  className="form-label contact-label"
                >
                  Your message
                </label>
                <textarea
                  onChange={handleDetailsChange}
                  className="form-control contact-input"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="message"
                  value={details.message}
                  required
                ></textarea>
              </div>

              <div className="col-10">
                <div className="form-check form-switch">
                  <input
                    onChange={handleDetailsChange}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    name="checkbox"
                    checked={details.checkbox}
                    required
                  />
                  <label
                    className="form-check-label"
                    html="flexSwitchCheckDefault"
                  >
                    I agree to the Terms & Conditions
                  </label>
                </div>
              </div>

              <div className="col-12">
                <button
                  className=" btn btn-outline-dark sendButton py-0"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactView;
