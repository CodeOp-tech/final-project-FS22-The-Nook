import React,{useState} from "react";

function ViewReviewModal (props){
    
    let b = props.book;
    

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
                <p > {b.comment} </p>    
            </div>

            </div>
        </div>
        </div>
        </div>

            
    )
}

export default ViewReviewModal
