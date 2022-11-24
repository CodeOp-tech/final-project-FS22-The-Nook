import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BookSearch.scss"

function BookSearch(props) {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");

    useEffect(() => {
        changeUrl();
        }, [searchInput, searchAuthor])

        function changeUrl(){
            navigate(`/books/all/?title=${searchInput}&author=${searchAuthor}`)
            props.getBooks() 
          }

   
    return (
        <div className="BookSearch pt-4">
            <h3>Search Book</h3>
             <form role="search">
                <input
                    className="form-control"
                    type="search"
                    placeholder="Title"
                    aria-label="Search by Title"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <input
                    className="form-control mt-2"
                    type="search"
                    placeholder="Author"
                    aria-label="Search by Author"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                />

             </form>
        </div>

    );
}

export default BookSearch;