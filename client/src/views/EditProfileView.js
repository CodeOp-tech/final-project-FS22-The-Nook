import React,{useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';
import ReactStars from 'react-stars';
import "./EditProfileView.css";

function EditProfileView(props){
let [modifiedUser, setInput] = useState({});

let user = props.user;


function handleInputChange(event){
    let {name, value} = event.target;
    setInput(modifiedUser => ({...modifiedUser, [name]: value}))
}

const ratingChanged = (newRating) => {
    console.log(newRating)
  }

function toggleFavorite () {
    
}


return(
        
        <div className="EditProfile">
            

            {}
            <h2 className="title">Edit Profile</h2>
            <form>
            <div className="inputs">
                <div className="form-group mb-2">
                    <label htmlFor="username" className="label">Username</label>
                    <input type="text" className="form-control" name="username" defaultValue={user.username} onChange={e=> handleInputChange(e)}/>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" defaultValue={user.email} onChange={e=> handleInputChange(e)} />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" placeholder="Enter New Password" onChange={e=> handleInputChange(e)}/>
                </div>
            </div>
            <button type="submit" className="btn btn-outline-light mt-4 save">Save changes</button>
            </form>


        <h2 className="title">Edit Your Clubs</h2>
            {user.clubs.map((c) => (
                <div key={c.name} className="d-inline-flex">
                <div key={c.category} className="card me-5" style={{ width: "18rem" }}>
                    <div >
                    <div className="card-body">
                        <h5 className="card-title">{c.name}</h5>
                    </div>
                    </div>
                </div>
                </div>
            ))}
        
        <h2 className="title">Edit Your Bookshelf</h2>
                {user.books.map((b) => (
                    <div key={b.author} className="d-inline-flex">
                    
                    <div key={b.title} className="card me-5" style={{ width: "18rem" }}>
                        <div >
                        <div>
                            <img
                            src={`${b.image}`}
                            className="card-img-top"
                            alt={`${b.title}`}
                            />
                        </div>

                        <div className="card-body">

                            <ReactStars
                            count={5}
                            size={24}
                            value={b.rating}
                            onChange={ratingChanged}
                            color2={'#ffd700'} />
                            <h5 className="card-title">{b.title}</h5>
                            <h6 className="card-text">By {b.author}</h6>
                    
                            <button key={b.id} 
                                id="button" type="button" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top" className="btn btn-outline-danger favoritebtn py-0" onClick={toggleFavorite}>
                                {b.favorite === 1 ?               
                                <i  className="bi bi-heart-fill heart"></i>                        
                                :<i className="bi bi-heart heart"></i>}
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}

        </div>
    )
}


export default EditProfileView;