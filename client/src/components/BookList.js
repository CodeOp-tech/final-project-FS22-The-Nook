import React, { useState } from "react";
import "./BookList.css"


function BookList(props) {

    return (
        <div className="container">  
          <div className="row justify-content-center">
             {
                 props.books.map(b => (
                   <div className="col-md-5 col-lg-3  book-card rounded m-3" key={b.id}>
                      <div>
                        <img
                            src={b.image}
                            alt={b.title}
                            id="book-img"
                        />
                       </div>
                       <div className="text-start">
                       <p><b>Title: </b>{b.title}</p>
                       <p><b>Author: </b>{b.author}</p>
                       <p><b>Clubs: </b>{b.clubs}</p>
                       {/* {
                        b.clubs.map((c) => (
                   
                          <p>{c}</p>
                         
                        ))
                       } */}
                       </div>
                   </div>
                 ))
              }
          </div>     
        </div>
    );
}

export default BookList;