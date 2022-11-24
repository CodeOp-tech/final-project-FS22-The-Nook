import React, { useState } from "react";
import "./BookList.css"
import { Link } from "react-router-dom";


function BookList(props) {

    return (
        <div className="container">  
          <div className="row justify-content-center">
  
             {   
                 props.allBooks.map(b => {return (
                   <div className="col-md-6 col-lg-3  book-card rounded m-3" key={b.book_id}>
                      <div>
                        <img
                            src={b.book_img}
                            alt={b.book_title}
                            id="book-img"
                        />
                       </div>
                       <div className="text-center">
                       <p><b>Title: </b>{b.book_title}</p>
                       <p><b>Author: </b>{b.book_author}</p>
                
                     
                      { b.clubsThatRead.length >= 1 ?
                       <div>
                        <p><b>Clubs: </b></p>
                        {
                          b.clubsThatRead.map(c => { return (
                            props.user   ?
                             <Link className="text-decoration-none" to={`/clubs/${c.club_id}`} ><p>{c.name}</p></Link>
                            :
                             <Link className="text-decoration-none" to="/login" ><p>{c.name}</p></Link>
                          )} )
                        }
                        </div>
                        : null
                      }
             

                      {
                        props.user ?
                        <Link to={`/books/all/${b.book_id}`}><button type="button" className="btn btn-outline-dark btn-sm mt-auto book-button">More info</button></Link>
                          :
                          <Link to="/login"><button className="book-button btn btn-outline-dark btn-sm mt-auto">More info</button></Link>
                      }
                       
                       </div>

                   </div>
                 )})
              }


          </div>    


        </div>
    );
}

export default BookList;