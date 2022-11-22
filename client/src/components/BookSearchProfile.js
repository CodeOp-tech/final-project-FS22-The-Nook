import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



function BookSearchProfile(props) {
   
    const [searchTitle, setTitle] = useState("");
    const [searchAuthor, setAuthor] = useState("");

    let user = props.user;
    let navigate = useNavigate();

    useEffect(() => {
    changeUrl();
    }, [searchTitle, searchAuthor])

      
      function changeUrl(){
        navigate(`/users/${user.id}/edit/?title=${searchTitle}&author=${searchAuthor}`)
        props.getBooks() 
      }




  return (
    <div className="ClubSearch pt-2">
        <form role="search">
            <input
                className="form-control"
                type="search"
                placeholder="Title"
                aria-label="Title"
                value={searchTitle}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                className="form-control"
                type="search"
                placeholder="Author"
                aria-label="Author"
                value={searchAuthor}
                onChange={(e) => setAuthor(e.target.value)}
            />

        </form>

    </div>
  );
}

export default BookSearchProfile;
