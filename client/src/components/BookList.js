import React, { useState } from "react";
import "./BookList.css"
import { Link } from "react-router-dom";


function BookList(props) {

    return (
        <div className="container">  
          <div className="row justify-content-center">
  
             {   
                 props.books.map(b => {return (
                   <div className="col-md-5 col-lg-3  book-card rounded m-3" key={b.book_id}>
                      <div>
                        <img
                            src={b.book_img}
                            alt={b.book_title}
                            id="book-img"
                        />
                       </div>
                       <div className="text-start">
                       <p><b>Title: </b>{b.book_title}</p>
                       <p><b>Author: </b>{b.book_author}</p>
                
                       <p><b>ClubNames: </b></p>

                       { b.clubsThatRead.length >= 1 ?
                        b.clubsThatRead.map(c => { 
                        return <Link to={`/clubs/${c.club_id}`} ><p>{c.name}</p></Link>
                        })
                        : null
                      }

                      <p><b>Users: </b></p>
                      { b.usersThatRead.length >= 1 ?
                        b.usersThatRead.map(u => { 
                        return <p>{u.username}</p>
                        })
                        : null
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