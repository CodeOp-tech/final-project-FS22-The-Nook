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
                                            <img src="https://via.placeholder.com/700x500.png/CB997E/333333?text=1" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 1</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://via.placeholder.com/700x500.png/DDBEA9/333333?text=2" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://via.placeholder.com/700x500.png/FFE8D6/333333?text=3" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 3</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://via.placeholder.com/700x500.png/B7B7A4/333333?text=4" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 4</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://via.placeholder.com/700x500.png/A5A58D/333333?text=5" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 5</div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="col-md-3">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src="https://via.placeholder.com/700x500.png/6B705C/eeeeee?text=6" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-img-overlay">Slide 6</div>
                                    </div>
                                </div>
                            </div>
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