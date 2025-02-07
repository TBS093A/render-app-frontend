import React from 'react';

import '../styles/general.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import FootComponent from '../components/foot.js';
import NavBarComponent from '../components/navbar.js';

import ModelsDashboard from './dashboards/models.js';

const DashboardPage = () => {

    const icons_size = "fa-2x"

    return (
    <>
        <NavBarComponent />
        <div className="dashboard-container" style={{"display": "flex"}}>   
            <main className="dashboard-content">
                <ModelsDashboard/>
            </main>
            <main className="large-menu-content">
                <p>Servers</p>
                <ol>
                    <li>
                        <i className={"fas " + icons_size + " fa-server"}></i> {/* fa-microchip */}
                        <p>Dashboard</p>
                    </li>
                </ol>
                <p>Rendering</p>
                <ol>
                    <li>
                        <i className={"fas " + icons_size + " fa-cube"}></i>
                        <p>3D Models</p>
                    </li>
                    <li>
                        <i className={"fas " + icons_size + " fa-paint-brush"}></i>
                        <p>Rendered Materials</p>
                    </li>
                </ol>
                <p>AI Training</p>
                <ol>
                    <li>
                        <i className={"fas " + icons_size + " fa-robot"}></i>
                        <p>AI Models</p>
                    </li>
                </ol>
                <p>User</p>
                <ol>
                    <li>
                        <i className={"fas " + icons_size + " fa-user-cog"}></i>
                        <p>Settings</p>
                    </li>
                    <li>
                        <i className={"fas " + icons_size + " fa-sign-out-alt"}></i>
                        <p>Log Out</p>
                    </li>
                </ol>
            </main>
        </div>
        <FootComponent />
    </>
    )
}


export default DashboardPage