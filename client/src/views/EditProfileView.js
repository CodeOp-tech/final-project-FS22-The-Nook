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

    return(
        <div className="EditProfile">
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
        
        
        <h2 className="title">Edit Your Bookshelf</h2>


        </div>
    )
}


export default EditProfileView;