import React,{useState, useEffect} from "react";
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';
import ReactStars from 'react-stars'



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

    const ratingChanged = (newRating) => {
        console.log(newRating)
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
                
            </div>

            <div className="FavoriteBooks">
                <h2>Your Favorite Books</h2>
                {user.books.map((b) => (
                    b.favorite === 1 ? 
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
                        edit={false}
                        color2={'#ffd700'} />
                            <h5 className="card-title">{b.title}</h5>
                            <h6 className="card-text">By {b.author}</h6>
                        </div>
                        </div>
                    </div>
                    </div> : null
                ))}
            </div>

            <div className="ReadBooks">
                <h2>Books You've Read</h2>
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
                        edit={false}
                        color2={'#ffd700'} />
                        <h5 className="card-title">{b.title}</h5>
                        <h6 className="card-text">By {b.author}</h6>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>


        </div>
    );
}


export default ProfileView;