import React from "react";
import './TopBooks.css'

function TopBooks(){

    return (
        <div class="bookContainer">
        <div className="row row-cols-4">

        <div className="col">
      <div className="card bookCard">
          <img src="https://i.pinimg.com/564x/87/b7/96/87b7960b1061d1b814edf41177509083.jpg" className="card-img-top" alt="book 1" />
          <div className="card-body">
            <h5 className="card-title">Book 1</h5>
            <p className="card-text">Book 1 has a long history blamgfgfdjgfgfdescrip fdjngdfjgndfjgnfjdgnjfd</p>
            </div></div></div>

            <div className="col">
            <div className="card bookCard">
          <img src="https://i.pinimg.com/564x/96/a2/c8/96a2c8d18ce9c1193719a17afa647ad2.jpg" className="card-img-top" alt="book 2" />
          <div className="card-body">
            <h5 className="card-title">Book 2</h5>
            <p className="card-text">Book 2 descrip</p>
            </div></div></div>

            <div className="col">
            <div className="card bookCard">
          <img src="https://i.pinimg.com/564x/76/b5/6d/76b56dee6305e2903c76ef420a76e5e6.jpg" className="card-img-top" alt="book 3" />
          <div className="card-body">
            <h5 className="card-title">Book 3</h5>
            <p className="card-text">Book 3 descrip</p>
            </div></div></div>

            <div className="col">
            <div className="card bookCard">
          <img src="https://i.pinimg.com/564x/7c/d5/82/7cd5821c0a9042c284109dc6880102cc.jpg" className="card-img-top" alt="book 4" />
          <div className="card-body">
            <h5 className="card-title">Book 4</h5>
            <p className="card-text">Book 4 descrip</p>
            </div></div></div>
            
          </div>
          </div>
          
    );
}

export default TopBooks;