import React from 'react';

import '../styles/large.cube.scss';


const LargeCubeComponent = () => {
    return (
        <div className="large-graphic-container">
            <div className="large-cube">
                <div className="front"></div>
                <div className="back"></div>
                <div className="right"></div>
                <div className="left"></div>
                <div className="top"></div>
                <div className="bottom"></div>
            </div>
        </div>
    )
}


export default LargeCubeComponent
