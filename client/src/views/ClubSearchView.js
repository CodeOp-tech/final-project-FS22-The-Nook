import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClubList from "../components/ClubList";
import ClubSearch from "../components/ClubSearch";
import CreateClub from "../components/CreateClub";
import './ClubSearchView.css'
import Local from '../helpers/Local';
import Api from '../helpers/Api';


function ClubSearchView(props) {
    // The useSearchParams hook is used to read and modify the query string in the URL 
    const [searchParams] = useSearchParams({});

    // search params for each field
    const name = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";

    const [clubs, setClubs] = useState([]);

    // const [members, setMembers] = useState();

    // search effect function
     useEffect(() => {
        getClubs();
    }, [name, category, location]); // useEfefct will run every time name and category are updated

    // search function 
    async function getClubs() {
        const query = new URLSearchParams({
            name: name,
            category: category,
            next_mtg_city: location,
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
    };


  return (
    <div className="container py-5 my-5 ClubSearchView">
      <div className="row">
        <div className="col-md-3">
           <ClubSearch />
        </div>

        <div className="col-md-9">
           <ClubList clubs={clubs} userJoinsClubCb={(c)=> joinClub(c)} user={props.user} />
        </div>

        <div className="col-md-3">
          
          <CreateClub/>
        </div>
        
      </div>
    </div>
  );
}

export default ClubSearchView;
