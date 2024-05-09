import React from 'react';

import '../styles/general.scss';

import SmallCubeComponent from './smallCube.js';


const NavBarComponent = () => {
    return (
        <div className="navbar">
            <div className="content-container">
                <div className="content">
                    <div className="section">
                        <SmallCubeComponent />
                    </div>
                </div>
                <div className="content">
                    <div className="section">
                        <h4>Menu |||</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default NavBarComponent
