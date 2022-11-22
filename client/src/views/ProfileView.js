import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars'
import "./ProfileView.css"



function ProfileView(props) {
    //const [user, setUser] = useState(null);
    let { userId } = useParams();

    let navigate = useNavigate()

    let user = props.user;
 

    function handleClick() {
        navigate(`/users/${userId}/edit`)
    }

    function redirect(clubId) {
        navigate(`./${clubId}`)}

    if (!user){
        return <h2>Loading...</h2>
    }

    return (
        <div className="ProfileView">
            <div className="container FullProfile">
            <h1>Profile View</h1>

            <button type="button" onClick={handleClick} className="btn btn-outline-light edit py-1">Edit</button>
            

            <div className="UserInfo">
                <h2>Personal Info</h2>

                <ul class="list-group">
  <li class="list-group-item">Username: {user.username}</li>
  <li class="list-group-item">Email: {user.email}</li>
  
</ul>
       
        
            </div>

            <div className="JoinedClubs">
                <h2>Your Book Clubs</h2>

              
             {user.clubs.map((c) => (
                    <div key={c.name} className="d-inline-flex">
                    <div key={c.category} className="card me-3 clubCards">
                        <div >
                        <div className="card-body">
                            <h5 className="card-title">{c.name}</h5>
                        </div>
                       
                        {/* <a
          type="button"
          className="btn btn-responsive btn-outline-dark"
          onClick={e => redirect(c.id)}
        >
          More Info
        </a> */}

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
                    <div key={b.title} className="card me-5 favoriteCards" >
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

                        <button key={b.id} 
                                type="button" className="btn btn-outline-danger favoritebtn py-0" data-toggle="button" aria-pressed="false" readOnly={true} disabled>
                                {b.favorite === 1 ?               
                                <i className="bi bi-heart-fill heart"></i>                        
                                :<i className="bi bi-heart heart"></i>}
                        </button>

                        </div>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
</div>
            </div>
       
    );
}


export default ProfileView;