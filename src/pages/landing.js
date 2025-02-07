import React from 'react';

import '../styles/general.scss';

import UserRegisterForm from '../components/forms/user_auth/userRegister.js';
import FootComponent from '../components/foot.js';
import NavBarComponent from '../components/navbar.js';


const LandingPage = () => {
    return (
        <>
            <NavBarComponent />
            <div className="landing-container">
                <header className="landing">
                    <h2>Affordable. Efficient. Accessible.</h2>
                    <h1>GUARANTED.</h1>
                    <p>
                        Minimize your expenses without compromising on quality.
                        <br />
                        Our platform is built for individuals who need top-tier rendering
                        <br />
                        <span className="span-white">
                             without the top-tier investment.
                        </span>
                    </p>
                    <button>
                        GET A DEMO
                    </button>
                    <h4>
                        GPU IS IMPORTANT...
                    </h4>
                    <p>
                        ...But <span className="span-white">GPU server can be very expensive.</span>
                        <br />
                        Configuration and administration<span className="span-white"> take too long time.</span>
                        <br />
                        <span className="span-white">
                            Everything of that needs so much additional knowledge.
                        </span>
                    </p>
                    <h2>
                        We Offer Ready Solution.
                    </h2>
                    <p>
                        Boost your GPU power for your 3D and AI models stuff
                        <br />
                        <span className="span-white">
                            without overpay for servers...
                        </span>
                        <br />
                        <span className="span-white">
                            ...without overtime for environment adjustments!
                        </span>
                    </p>
                    <h2>
                        "OK... So What Makes You So Different?"
                    </h2>
                    <h4>
                        GUARANTED
                    </h4>
                    <p>
                        We only win if you win. You won't carry all the risk, we'll share it
                    </p>
                    <h4>
                        RESLUTS
                    </h4>
                    <p>
                        Our first priority is to get you results.
                    </p>
                    <h4>
                        LOCAL
                    </h4>
                    <p>
                    </p>
                    <h4>
                        SPECIALIZED
                    </h4>
                    <p>
                    </p>
                </header>
                <main className="secondary-content">
                    <UserRegisterForm />
                </main>
            </div>
            <FootComponent />
        </>
    )
}


export default LandingPage
