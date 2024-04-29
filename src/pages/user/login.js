import React from 'react';

import '../../styles/general.scss';
import '../../styles/LoginPage.cube.scss';

import GraphicContainerComponent from '../../components/graphic-container.js';
import UserLoginForm from '../../components/forms/user_auth/userLogin.js';


const LoginPage = () => {
    return (
        <div className="login-container">
            <header className="header">
                <h1>XGPU</h1>
            </header>
            <main className="main-content">
                <GraphicContainerComponent />
                <UserLoginForm />
            </main>
        </div>
    )
}


export default LoginPage
