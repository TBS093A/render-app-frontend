import React from 'react';

import '../styles/general.scss';

import SmallCubeComponent from './smallCube.js';


const FootComponent = () => {
    return (
        <footer>
            <div className="content-container">
                <div className="content">
                    <div className="section">
                        <SmallCubeComponent />
                    </div>
                    <div className="section">
                        <h4>
                            <a>
                                BUSINESS
                            </a>
                        </h4>
                        <h4>
                            <a>
                                SIGN IN
                            </a>
                        </h4>
                        <h4>
                            <a>
                                SIGN UP
                            </a>
                        </h4>
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                        <h4>
                            Company
                        </h4>
                    </div>
                    <div className="section">
                        <a>
                            About Us
                        </a>
                    </div>
                    <div className="section">
                        <a>
                            Contact Us
                        </a>
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                        <h4>
                            Resources
                        </h4>
                    </div>
                    <div className="section">
                        <a>
                            Blog
                        </a>
                    </div>
                    <div className="section">
                        <a>
                            Help Center
                        </a>
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                    </div>
                </div>
            </div>
            <div className="bottom">
                <p>
                    &copy; {new Date().getFullYear()} FehuDev. All rights reserved.
                </p>
            </div>
        </footer>
    )
}


export default FootComponent
