import React from 'react';

import '../styles/general.scss';

import GraphicContainerComponent from '../components/graphic-container.js';

const LandingPage = () => {
    return (
        <div className="login-container">
            <header className="landing">
                <h2>Affordable. Efficient. Accessible.</h2>
                <h1>GUARANTED.</h1>
                <p>
                    Minimize your expenses without compromising on quality.
                    <br />
                    Our platform is built for individuals
                    <span className="span-white">
                        who need top-tier rendering without the top-tier investment.
                    </span>
                </p>
                <button>
                    GET A DEMO
                </button>
                <p>
                    <span className="span-first-color">
                        GPU Is Important...
                    </span>
                    <br />
                    ...but
                </p>
            </header>
            <main className="main-content">
                <GraphicContainerComponent />
            </main>
        </div>
    )
}


export default LandingPage
