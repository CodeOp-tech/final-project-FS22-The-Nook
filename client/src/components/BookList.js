import React, { useState } from "react";
import "./BookList.css"
import { Link } from "react-router-dom";


function BookList(props) {

    return (
        <div className="container">  
          <div className="row justify-content-center">
    
  
             {   
                 props.allBooks.map(b => {return (
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
                
                     

                       { b.clubsThatRead.length >= 1 ?
                       <div>
                        <p><b>Clubs: </b></p>
                        {
                          b.clubsThatRead.map(c => { 
                          return <Link className="text-decoration-none" to={`/clubs/${c.club_id}`} ><p>{c.name}</p></Link>
                          })}
                        </div>
                        : null
                      }

                      {
                        props.user ?
                        <Link to={`./${b.book_id}`}><button type="button" >More info</button></Link>
                          :
                          <Link to="/login"><button>More info</button></Link>
                      }

                      {/* <p><b>Users: </b></p>
                      { b.usersThatRead.length >= 1 ?
                        b.usersThatRead.map(u => { 
                        return <p>{u.username}</p>
                        })
                        : null
                      } */}
                       
                       </div>
                   </div>
                 )})
              }


          </div>     
        </div>
    );
}

export default BookList;