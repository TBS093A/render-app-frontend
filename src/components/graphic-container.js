import React from 'react';

import '../styles/LoginPage.cube.scss';


const GraphicContainerComponent = () => {
    return (
        <div className="graphic-container">
            <div className="cube">
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


export default GraphicContainerComponent
