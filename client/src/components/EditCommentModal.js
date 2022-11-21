import React,{useState} from "react";

function EditCommentModal (props){
    let [review, setReview] = useState("");


    let b = props.book;

    function changeReview (event) {
        setReview(event.target.value);
    }
    
    function submitReview (book) {
        book.comment = review;
        setReview("");
        props.updateBook = (book);
    }
    

    return (
        <div>
        {/* <!-- The Modal --> */}
        <div className="modal" id="myModal">
        <div className="modal-dialog">
            <div className="modal-content">

            {/* <!-- Modal Header --> */}
            <div className="modal-header">
                <h4 className="modal-title">My review for "{b.title}":</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
                <textarea onChange={e=> changeReview(e)}  defaultValue={b.comment}></textarea>
                
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
                <button onClick={e=> submitReview(b)}type="button" className="btn btn-primary" data-bs-dismiss="modal" >Save Changes</button>
                <button onClick={e=> setReview("")} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>

            </div>
        </div>
        </div>
        
        </div>

            
    )
}

export default EditCommentModal
