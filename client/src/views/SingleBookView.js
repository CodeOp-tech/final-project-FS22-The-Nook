import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleBookView.css";


function SingleBookView(props) {

    const { id } = useParams();
    const [ book, setBook ] = useState({});


    useEffect(() => {
        getSingleBook(id)
    }, []); 
 

    async function getSingleBook() {

            try {
                let response = await fetch(`/books/all/?book_id=${id}`);
               
                if (response.ok) {
                    let book = await response.json();
                    setBook(book)
                } else {
                    console.log(`Server error: ${response.status} ${response.statusText}`);
                }
    
            } catch (err) {
                    console.log(`Network error: ${err.message}`);
            }
     };

    return (
      
        <div className="container sg-book p-5 my-5">
            { 
            
            book.length > 0 && 
                <div>
            <h1 className="mb-5">{book[0].book_title}</h1>
                <div className="row mb-5 p-5 box-border">
                    <div className="col-lg-4 singleBook-box">
                            <img 
                            className="singleBook-img"
                            src={book[0].book_img}
                            alt={book[0].book_title}
                            /> 
                    </div>
                    <div className="col-lg-8 text-start pe-5">
                        <p><b>Author: </b>{book[0].book_author}</p>
                        <p><b>Description: </b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>

                <div className="row box-border">
                <div className="col-6 mt-5">
                    <h3 className="mb-5">Clubs that have read this book:</h3>
                    {
                    book[0].clubsThatRead.map(c => (
                    <div className="row  mb-3">
                    <p className=" "><b>Club name: </b>{c.name}</p>
                    </div>
                    
                    ))
                    }
                </div>

                <div className="col-6 mt-5">
                    <h3 className="mb-5">Members that have read this book:</h3>
                    { book[0].usersThatRead.length > 0 ?
                    book[0].usersThatRead.map(u => (
                    <div className="row mb-3">
                    <p><b>Username: </b>{u.username}</p>
                    <p><b>Rating: </b>{u.rating}</p>
                    <p><b>Comment: </b>{u.comment}</p>

                    </div>
                    ))
                    : "No user has marked this book as read."
                    }
                </div>
            
             </div>
             </div>
}

        </div>
    );
}

export default SingleBookView;




