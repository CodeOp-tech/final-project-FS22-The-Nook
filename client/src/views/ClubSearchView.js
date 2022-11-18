import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClubList from "../components/ClubList";
import ClubSearch from "../components/ClubSearch";
import './ClubSearchView.css'
import Local from '../helpers/Local';
import Api from '../helpers/Api';


function ClubSearchView(props) {
    // The useSearchParams hook is used to read and modify the query string in the URL 
    const [searchParams] = useSearchParams({});

    // search params for each field
    const name = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const [clubs, setClubs] = useState([]);

    // const [members, setMembers] = useState();

    // search effect function
     useEffect(() => {
        getClubs();
    }, [name, category]); // useEfefct will run every time name and category are updated

    // search function 
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

    // get the number of members for each club 
    // useEffect(() => {
//       getMembers();
//   }, []); 

//   async function getMembers() {
//     try {
//       let response = await fetch("/clubs/joined")
//       if (response.ok) {
//         let people = await response.json();
//         setMembers(people)
//       } else {
//         console.log(`Server error: ${response.status} ${response.StatusText}`);
//         }
//     } catch (err) {
//         console.log(`Network error: ${err.message}`);
//     }
// }


    async function joinClub(club) {
      let options = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(club) 
      }

       // add token to the header if it exists in local storage
      let token = Local.getToken(); 
      if (token) {
         options.headers['Authorization'] = 'Bearer ' + token;
      }

      try {
        let response = await fetch (`/clubs/${club.id}`, options);
        if (response.ok) {
          let json = await response.json()
          props.setUser(json)
        } else {
          console.log(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
         console.log(`Network error: ${err.message}`);
      }
    }



  return (
    <div className="container ClubSearchView">
      <div className="row">
        <div className="col-md-3">
           <ClubSearch />
        </div>

        <div className="col-md-9">
           <ClubList clubs={clubs} userJoinsClubCb={(c)=> joinClub(c)} user={props.user} />
        </div>

      </div>

    </div>
  );
}

export default ClubSearchView;
