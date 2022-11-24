import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from 'react-stars';
import { DateTime } from "luxon";





function AddBookForm(props) {
    const EMPTY_BOOK_FORM = {
        title: "",
        date_read: "",
        favorite: 0,
        rating: 0,
        comment: ""
      };

    const[favorite, setFavorite] = useState(0);
    const [bookFormData, setBookFormData] = useState(EMPTY_BOOK_FORM);
    const { id } = useParams();
 

      function handleNewBookChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        setBookFormData((state) => ({
            ...state,
            [name]: value,
          }));
      }

      const ratingChanged = (newRating) => {
        setBookFormData((state) => ({
            ...state,
            rating: newRating,
          }))
    } 


    function toggleFavorite (event) {    
        bookFormData.favorite === 1 ?  setBookFormData((state) => ({
            ...state,
            favorite: 0,
          })) : setBookFormData((state) => ({
            ...state,
            favorite: 1,
          }))
    }

      function handleSubmit(e) {
        e.preventDefault();
        props.postBookForUser(bookFormData);
        setBookFormData(EMPTY_BOOK_FORM);
      }

    return(
        <div>
            {/* <!-- The Modal --> */}
            <div className="modal" id="bookModal">
                    <div className="modal-dialog">
                        <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h4 className="modal-title">Add book to your bookshelf</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                        <form className=" w-100 mx-0" onSubmit={handleSubmit}>
                          <div className="row">
                          <div className="col mb-6">
                              <label htmlFor="title" className="form-label">
                              Book Title
                              </label>
                              <input
                              type="text"
                              className="form-control"
                              id="titleInput"
                              name="title"
                              value={bookFormData.title}
                              onChange={(e) => handleNewBookChange(e)}
                              />
                          </div>

                          <label>Read on: 
                                      <input type="date"
                                      name= "date_read"
                                      value={bookFormData.date_read}
                                      onChange={(e) => handleNewBookChange(e)}
                                      />
                                      </label>

                          <p>My rating:</p>
                                  <ReactStars
                                  count={5}
                                  size={24}
                                  value = {bookFormData.rating}
                                  onChange={ratingChanged}
                                  color2={'#ffd700'} />

                          <div className="col mb-6">
                              <label htmlFor="review" className="form-label">
                                  Write a review 
                              </label>
                              <textarea
                              type="review"
                              className="form-control"
                              id="reviewInput"
                              name="review"
                              value={bookFormData.review}
                              onChange={(e) => handleNewBookChange(e)}
                              />
                          </div>

                          <button key={favorite} 
                                      id="button" type="button" 
                                      className="btn btn-outline-danger favoritebtn py-0" 
                                      name="favorite"
                                      onClick={e => toggleFavorite(e)}>
                                      {bookFormData.favorite === 1 ?               
                                      <i  className="bi bi-heart-fill heart" ></i>                        
                                      :<i className="bi bi-heart heart"></i>}
                                  </button>
                                  
                              </div>

                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button onClick={e=> handleSubmit(e)}type="button" className="btn btn-primary" data-bs-dismiss="modal" >Add Book</button>
                            <button onClick={e=> setBookFormData(EMPTY_BOOK_FORM)} type="button" className="btn btn-danger" data-bs-dismiss="modal">Dismiss</button>
                        </div>

                        </form>

                        </div>
                    </div>
                    </div>


                    


                
          </div>
        </div>
    )
}

export default AddBookForm