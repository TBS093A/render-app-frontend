import React from 'react';

import '../../styles/general.scss';

import LargeCubeComponent from '../../components/largeCube.js';
import UserLoginForm from '../../components/forms/user_auth/userLogin.js';
import FootComponent from '../../components/foot.js';
import NavBarComponent from '../../components/navbar.js';

const LoginPage = () => {
    return (
    <>
        <NavBarComponent />
        <div className="login-container" style={{"display": "flex"}}>
            <main className="main-content">
                <div style={{"padding-left": "200px"}}>
                    <UserLoginForm />
                </div>
            </main>
            <main className="main-content">
                <div style={{"padding-right": "200px"}}>
                    <LargeCubeComponent />
                </div>
            </main>
        </div>
        <FootComponent />
    </>
    )
}


export default LoginPage
