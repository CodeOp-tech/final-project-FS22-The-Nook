import React,{useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';
import './ProfileView.css'


function ProfileView(props) {
    const [user, setUser] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    let { userId } = useParams();
 
    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        let myresponse = await Api.getUser(userId);
        if (myresponse.ok) {
            setUser(myresponse.data);
            setErrorMsg('');
        } else {
            setUser(null);
            let msg = `Error ${myresponse.status}: ${myresponse.error}`;
            setErrorMsg(msg);
        }
    }

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="ProfileView">
            <h1>Profile View</h1>

            <div className="UserInfo">
                <h2>Personal Info</h2>
            ID: {user.id}
           
            <br />
            Username: {user.username}

            <br />
            Email: {user.email}
        
            </div>

            <div className="JoinedClubs">
                <h2>Your Book Clubs</h2>
            </div>

            <div className="FavoriteBooks">
                <h2>Your Favorite Books</h2>
            </div>

            <div className="ReadBooks">
                <h2>Books You've Read</h2>
            </div>


        </div>
    );
}


export default ProfileView;