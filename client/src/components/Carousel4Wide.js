import React, { useEffect } from 'react';
import './Carousel4Wide.css';


function Carousel4Wide(props) {

    useEffect(() => {
        doInit();
    },[]);

    function doInit() {
        let items = document.querySelectorAll('.carousel .carousel-item')

		items.forEach((el) => {
			const minPerSlide = 4
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
                    // wrap carousel by using first child
                    next = items[0]
                }
                let cloneChild = next.cloneNode(true)
                el.appendChild(cloneChild.children[0])
                next = next.nextElementSibling
            }
        });
    }

    return (
        <div className="Carousel4Wide">
            <div className="container text-center my-3">
                <div className="row mx-auto my-auto justify-content-center">
                    <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/84/e4/73/84e4732d07ffc571aee8abc261e2249a.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay"><span className="clubName" >The Bookworms</span></div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/01/40/2a/01402a66c993be04a1914483eda7c089.jpg" className="img-fluid" alt="" />
                                        </div>

                                      <div className="card-img-overlay"><span className="clubName">All Booked</span></div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/87/f4/90/87f49037e6d155b3f90b21d1a76eba1d.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay"><span className="clubName">Wine & Read</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/b9/db/1b/b9db1b0030be494fdecd9de24399b2cb.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay"><span className="clubName">The Wild Readers</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/76/b2/00/76b200b6807404b1fda815a95e30ab8b.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay"><span className="clubName">Due Date Club</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://i.pinimg.com/564x/5d/b8/57/5db857920d3a2c002af672bddc0424f9.jpg" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay"><span className="clubName">Adventures in Bookland</span></div>
                                    </div>
                                </div>
                            </div>  */}
                        </div>


                        <a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        </a>
                        <a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        </a>
                    </div>
                </div>		
            </div>
        </div>
    );
}

export default Carousel4Wide;