import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClubList from "../components/ClubList";
import ClubSearch from "../components/ClubSearch";


function ClubSearchView(props) {
    // The useSearchParams hook is used to read and modify the query string in the URL 
    const [searchParams] = useSearchParams({});


    // search params for each field
    const name = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const [clubs, setClubs] = useState([]);

    
    // search effect function
     useEffect(() => {
        getClubs();
    }, [name, category]); // useEfefct will run every time name and category are updated



    async function getClubs() {
        const query = new URLSearchParams({
            name: name,
            category: category,
        }).toString();

        try {
            let response = await fetch("/clubs/?" + query);
            if (response.ok) {
                let clubs = await response.json();
                setClubs(clubs)
            } else {
                console.log(`Server error: ${response.status} ${response.StatusText}`);
            }
        } catch (err) {
                console.log(`Network error: ${err.message}`);
        }
    }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
           <ClubSearch />
        </div>

        <div className="col-md-9">
           <ClubList clubs={clubs} />
        </div>

      </div>

    </div>
  );
}

export default ClubSearchView;
