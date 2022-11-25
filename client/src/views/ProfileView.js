import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { DateTime } from "luxon";
import ReactStars from "react-stars";
import "./ProfileView.scss";
import ViewReviewModal from "../components/ViewReviewModal";

function ProfileView(props) {
  let [book, setBook] = useState({});

  let { userId } = useParams();

  let navigate = useNavigate();

  let user = props.user;

  console.log("user", user);

  function handleClick() {
    navigate(`/users/${userId}/edit`);
  }

  function redirect(clubId) {
    navigate(`./${clubId}`);
  }

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="ProfileView my-5">
      <div className="container FullProfile">
        <h1>Profile View</h1>

        <button
          type="button"
          onClick={handleClick}
          className="btn btn-outline-dark edit py-1"
        >
          Edit
        </button>

        <div className="UserInfo">
          <h2 className="my-3">Personal Info</h2>

          <ul className="list-group">
            <li className="list-group-item mb-2">Username: {user.username}</li>
            <li className="list-group-item">Email: {user.email}</li>
          </ul>
        </div>

        <div className="JoinedClubs mt-5">
          <h2 className="mb-5">Your Book Clubs</h2>

        <div className="row px-5">
          {user.clubs.map((c) => (
            <div className="col-lg-4 overlay" key={c.id}>
              <div className="">
              <img
                src={c.image}
                id="club-img"
                alt={c.name}
              />
              </div>
              <div className="cb-text-overlay ">
                <Link to={`/clubs/${c.id}`} className="card-title" key={c.id}>
                  <h4 className="cb-text-bg rounded">{c.name}</h4>
                </Link>
              </div>
           
            </div>
          ))}
          </div>
        </div>

        <div className="FavoriteBooks">
          <h2 className="mb-5">Your Favorite Books</h2>
          {user.books.map((b) =>
            b.favorite === 1 ? (
              <div key={b.author} className="d-inline-flex">
                <div key={b.title} className="card me-5 favoriteCards">
                  <div>
                    <div>
                      <img
                        src={`${b.image}`}
                        className="card-img-top"
                        alt={`${b.title}`}
                      />
                    </div>
                    <div className="card-body">
                      <p>My rating:</p>
                      <ReactStars
                        count={5}
                        size={24}
                        value={b.rating}
                        edit={false}
                        color2={"#ffd700"}
                      />
                      <br></br>
                      <div className="card-title">
                        <Link to={`/books/all/${b.book_id}`} key={b.book_id}>
                          <h5>{b.title}</h5>
                        </Link>
                      </div>

                      <h6 className="card-text">By {b.author}</h6>
                      <p>
                        Read on:{" "}
                        {DateTime.fromISO(b.date_read).toFormat("LLL dd, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        <div className="ReadBooks mt-5 pb-5">
          <h2 className="mb-5">Books You've Read</h2>
          {user.books.map((b) => (
            <div key={b.author} className="d-inline-flex">
              <div
                key={b.title}
                className="card me-5"
                style={{ width: "18rem" }}
              >
                <div>
                  <div>
                    <img
                      src={`${b.image}`}
                      className="card-img-top"
                      alt={`${b.title}`}
                    />
                  </div>

                        <div className="card-body">

                            <p>My Rating:</p>
                            <ReactStars
                            count={5}
                            size={24}
                            value={b.rating}
                            edit={false}
                            color2={'#ffd700'} />

                    <div className="card-title">
                      <Link to={`/books/all/${b.book_id}`} key={b.book_id}>
                        <h5>{b.title}</h5>
                      </Link>
                    </div>

                    <h6 className="card-text">By {b.author}</h6>

                    <p>
                      Read on:{" "}
                      {DateTime.fromISO(b.date_read).toFormat("LLL dd, yyyy")}
                    </p>

                    <button
                      key={b.id}
                      type="button"
                      className="btn btn-outline-danger favoritebtn py-0"
                      data-toggle="button"
                      aria-pressed="false"
                      readOnly={true}
                      disabled
                    >
                      {b.favorite === 1 ? (
                        <i className="bi bi-heart-fill heart"></i>
                      ) : (
                        <i className="bi bi-heart heart"></i>
                      )}
                    </button>

                    <br />

                        <a data-bs-toggle="modal" data-bs-target="#myModal"  onClick={e => setBook(b)}> View My Review</a>
                        </div>

                        <ViewReviewModal id="myModal" book={book}/>


                        
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
