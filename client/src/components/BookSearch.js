import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookSearch() {
    const nav = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");


    function handleSubmit(e) {
        e.preventDefault();
        nav(
            "/books/?title=" +
            searchInput +
            "&author=" +
            searchAuthor 
        );

        //reset search input fields
        setSearchInput("");
        setSearchAuthor("");
    }
    return (
        <div className="pt-4">
             <form role="search" onSubmit={handleSubmit}>
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

                <button className="btn btn-outline-secondary mt-3" type="submit">Search</button>
             </form>
        </div>

    );
}

export default BookSearch;