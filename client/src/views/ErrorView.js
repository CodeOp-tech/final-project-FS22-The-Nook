import React from 'react';
import './ErrorView.scss'


function ErrorView(props) {

    console.log(`Error ${props.code}: ${props.text}`)
    return (
        <div className="ErrorView">
            <h1>Oopsie!</h1>

            <img className="errorIcon" src="https://i.imgur.com/6RaPL9C.png"/>

        <h2>The page you are looking for doesn't exist...</h2>

        <h3>Why not try:</h3>
        <div className="errorButtons">
        <a
          type="button"
          className="btn btn-responsive btn-outline-dark errorButton py-1"
          href="/clubs"
        >
          See All Clubs
        </a>

        <a
          type="button"
          className="btn btn-responsive btn-outline-dark errorButton py-1"
          href="/books"
        >
          See All Books
        </a>

        <a
          type="button"
          className="btn btn-responsive btn-outline-dark errorButton py-1"
          href="/"
        >
          Homepage
        </a>
        </div>

        </div>
    );
}

export default ErrorView;