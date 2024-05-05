import React from 'react';

import '../styles/small.cube.scss';


const SmallCubeComponent = () => {
    return (
        <div className="graphic-container">
            <div className="cube">
                <div className="face-front"></div>
                <div className="face-back"></div>
                <div className="face-right"></div>
                <div className="face-left"></div>
                <div className="face-top"></div>
                <div className="face-bottom"></div>
            </div>
            <div className="title">
                XGPU
            </div>
        </div>
    )
}


export default SmallCubeComponent
