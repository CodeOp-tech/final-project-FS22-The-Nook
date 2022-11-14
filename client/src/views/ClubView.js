import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ClubList from "../components/ClubList";
import ClubSearch from "../components/ClubSearch";


function ClubView(props) {
    const [searchParams] = useSearchParams({});

    // search params for each field
    const search = searchParams.get("search") || "";
    // const name = searchParams.get("name") || "";
    const category = searchParams.get("category") || "";

    const [clubs, setClubs] = useState([]);

    
    // search effect function
     useEffect(() => {
        getClubs();
    }, [search, category]); // useEffect is dependent on search and category - the effect will run again if they are updated

    // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path> .

    async function getClubs() {
        const query = new URLSearchParams({
            name: search,
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
    <div className="ClubView">
      <ClubSearch />
      <ClubList clubs={clubs} />
    </div>
  );
}

export default ClubView;
