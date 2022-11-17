import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

function CreateClub() {
    const nav = useNavigate();

    const [field, setField] = useState({
        name: "",
        genre: "",
        location: "",
        image: "",
      });
    
      async function addClub() {
        try {
          // create response - fetch data, method post
          let response = await fetch("/clubs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(field),
          });
          //if response fetch works
          if (response.ok) {
            nav("/clubs");
          } else {
            console.log(`Server Error: ${response.status} ${response.statusText}`);
          }
        } catch (err) {
          console.log(`Network Error: ${err.message}`);
        }
      }

      
    const handleSubmit = (e) => {
        e.preventDefault();
        addClub();
        console.log("You have created a new book club!")
        navigate(`/clubs`);
      }

      const onChange = (fieldName) => (e) => {
        return setField({ ...field, [fieldName]: e.target.value });
      };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center">
          <h2>Create A New Club</h2>
          <div className="col">
            <ul className="list-group align-items-center">

              <li className="list-group-item">
                <label>
                  <div>Club Name</div>
                  <input
                    type="text"
                    value={field.name}
                    onChange={onChange("name")}
                    placeholder="e.g. Les Bibliophiles"
                  />
                </label>
              </li>

              <li className="list-group-item">
                <label>
                  <div>Genre</div>
                  <input
                    type="text"
                    value={field.genre}
                    onChange={onChange("genre")}
                    placeholder="e.g. Romance"
                  />
                </label>
              </li>

              <li className="list-group-item">
                <label>
                  <div>Location</div>
                  <input
                    type="text"
                    value={field.location}
                    onChange={onChange("location")}
                    placeholder="e.g. Paris"
                  />
                </label>
              </li>

              <li className="list-group-item">
                <label>
                  <div>Image URL (for now)</div>
                  <input
                    type="url"
                    value={field.image}
                    onChange={onChange("image")}
                    placeholder="Add a link here"
                  />
                </label>
              </li>

            </ul>

            <button className="createClubButton" type="submit">
              Create Club
            </button>


          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateClub;
