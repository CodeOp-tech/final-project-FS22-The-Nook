import React from "react";
import './ContactView.css'

function ContactView() {

    function handleContactSubmit(e) {
        e.preventDefault();
        alert("Thank you! We'll be in touch shortly.");
        console.log("Submitted!")
    };

    return (
<div className="container contactContainer">
    <h1>Contact Us</h1>

    <div class="row">
    <div class="col contactUs">
      <h3>Where to find us:</h3>

<div className="contactOptions">
      <div className="contactEmail">
        <p><b><i class="bi bi-envelope-heart"></i> Email:</b><br/>sayhi@thenook.com</p>
      </div><br/>

      <div className="contactPhone">
      
        <p><i class="bi bi-telephone"></i> <b>Phone:
        <br/></b>+34 648 491 591</p>
      </div><br/>

      <div className="contactAddress">
        <p><i class="bi bi-buildings"></i><b>Address:
        <br/></b> Carrer d'en Grassot 101, <br></br>08025,<br/>Barcelona,<br/>Spain</p>
      </div>
      </div>
    </div>

    <div class="col messageUs">
    <h3>Send us a message:</h3>
<form className="row-g3" onSubmit={handleContactSubmit}>

  <div className="col-md-10">
    <label htmlFor="validationDefaultFirstName" className="form-label">First name</label>
    <input type="text" className="form-control" id="validationDefaultFirstName"  required/>
  </div>
  <div className="col-md-10">
    <label htmlFor="validationDefaultLastName" className="form-label">Last name</label>

    <input type="text" className="form-control" id="validationDefaultLastName"  required/>
  </div>
  <div className="col-md-10">
    <label html="validationDefaultUsername" className="form-label">Email</label>
    <div className="input-group">
      <span className="input-group-text" id="inputGroupPrepend2">@</span>
      <input type="text" className="form-control" id="validationDefaultUsername"  aria-describedby="inputGroupPrepend2" required/>
    </div>
  </div>

 <div className="col-md-10">
  <label html="exampleFormControlTextarea1" className="form-label">Your message</label>
  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
</div>
  
  <div className="col-10">
  <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" required/>
  <label className="form-check-label" html="flexSwitchCheckDefault">I agree to the Terms & Conditions</label>
</div>
  </div>

  <div className="col-10">
  <div className="form-check form-switch ">
  <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
  <label className="form-check-label" html="flexSwitchCheckDefault" >Send a copy to my email</label>
</div>
  </div>

  <div className="col-12">
    <button className="btn btn-outline-dark sendButton py-0" type="submit" >Send</button>
  </div>
</form>
</div>

</div>
</div>
    );
}

export default ContactView;