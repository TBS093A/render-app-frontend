import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/general.scss';

const NotFoundPage = () => {
    return (
        <div className="landing-container">
            <div className="landing">
                <h1>404</h1>
                <h2>Strona nie została znaleziona</h2>
                <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
                <Link to="/">
                    <button>Powrót do strony głównej</button>
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage; 