import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";
import BookList from "../components/BookList";

function AllBooksView(props) {
    const [searchParams] = useSearchParams({});
    const title = searchParams.get("title") || "";
    const author = searchParams.get("author") || "";
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []); 
    
    // useEffect(() => {
    //     getBooks();
    // }, [title, author]); 


    async function getBooks() {
        const query = new URLSearchParams({
            title: title,
            author: author,
        }).toString();
        try {
            let response = await fetch("/books/all/?" + query);
            if (response.ok) {
                let books = await response.json();
                setBooks(books)
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }

        } catch (err) {
                console.log(`Network error: ${err.message}`);
        }
    };

return (
    <div className="AllBooks">
    <div className="container py-5 my-5 ClubSearchView">
      <div className="row">
        <div className="col-md-3">
           <BookSearch getBooks={e=> getBooks()}/>
        </div>

        <div className="col-md-9">
           <BookList books={books} user={props.userInfo}/>
        </div>

        
      </div>
    </div>

     </div>
);

}

export default AllBooksView;