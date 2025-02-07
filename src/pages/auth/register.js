import React from 'react';

import '../../styles/general.scss';

import LargeCubeComponent from '../../components/largeCube.js';
import UserRegisterForm from '../../components/forms/user_auth/userRegister.js';
import FootComponent from '../../components/foot.js';
import NavBarComponent from '../../components/navbar.js';

const RegisterPage = () => {
    return (
    <>
        <NavBarComponent />
        <div className="register-container" style={{"display": "flex"}}>
            <main className="main-content">
                <div style={{"padding-left": "200px"}}>
                    <UserRegisterForm />
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


export default RegisterPage
