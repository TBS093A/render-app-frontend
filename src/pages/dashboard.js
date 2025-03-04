import React, { useState } from 'react';
import '../styles/general.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import FootComponent from '../components/foot.js';
import NavBarComponent from '../components/navbar.js';

import ThreeDModelsDashboard from './dashboards/3d-models.js';
import AIModelsDashboard from './dashboards/ai.models.js';
import AITasksDashboard from './dashboards/ai.tasks.js';
import RendersDashboard from './dashboards/renders.js';
import ServersDashboard from './dashboards/servers.js';
import UserSettings from './dashboards/user.js';

const DashboardPage = () => {
    const icons_size = "fa-2x";
    const [activeComponent, setActiveComponent] = useState('3d-models');

    const handleNavigation = (path) => {
        setActiveComponent(path);
    };

    const isActive = (path) => {
        return activeComponent === path;
    };

    const handleLogout = () => {
        // TODO: Implement proper logout logic (clear tokens, session, etc.)
        console.log('Logging out...');
        window.location.href = '/login';
    };

    const renderContent = () => {
        switch (activeComponent) {
            case 'ai-models':
                return <AIModelsDashboard />;
            case 'ai-tasks':
                return <AITasksDashboard />;
            case 'renders':
                return <RendersDashboard />;
            case 'servers':
                return <ServersDashboard />;
            case 'settings':
                return <UserSettings />;
            case '3d-models':
            default:
                return <ThreeDModelsDashboard />;
        }
    };

    return (
        <>
            <NavBarComponent />
            <div className="dashboard-container" style={{"display": "flex"}}>   
                <main className="dashboard-content">
                    {renderContent()}
                </main>
                <main className="large-menu-content">
                    <p>Servers</p>
                    <ol>
                        <li 
                            className={isActive('servers') ? 'active' : ''}
                            onClick={() => handleNavigation('servers')}
                        >
                            <i className={"fas " + icons_size + " fa-server"}></i>
                            <p>Dashboard</p>
                        </li>
                    </ol>
                    <p>Rendering</p>
                    <ol>
                        <li 
                            className={isActive('3d-models') ? 'active' : ''}
                            onClick={() => handleNavigation('3d-models')}
                        >
                            <i className={"fas " + icons_size + " fa-cube"}></i>
                            <p>3D Models</p>
                        </li>
                        <li 
                            className={isActive('renders') ? 'active' : ''}
                            onClick={() => handleNavigation('renders')}
                        >
                            <i className={"fas " + icons_size + " fa-paint-brush"}></i>
                            <p>Rendered Materials</p>
                        </li>
                    </ol>
                    <p>AI Training</p>
                    <ol>
                        <li 
                            className={isActive('ai-models') ? 'active' : ''}
                            onClick={() => handleNavigation('ai-models')}
                        >
                            <i className={"fas " + icons_size + " fa-robot"}></i>
                            <p>AI Models</p>
                        </li>
                        <li 
                            className={isActive('ai-tasks') ? 'active' : ''}
                            onClick={() => handleNavigation('ai-tasks')}
                        >
                            <i className={"fas " + icons_size + " fa-microchip"}></i>
                            <p>AI Training Tasks</p>
                        </li>
                    </ol>
                    <p>User</p>
                    <ol>
                        <li 
                            className={isActive('settings') ? 'active' : ''}
                            onClick={() => handleNavigation('settings')}
                        >
                            <i className={"fas " + icons_size + " fa-user-cog"}></i>
                            <p>Settings</p>
                        </li>
                        <li onClick={handleLogout}>
                            <i className={"fas " + icons_size + " fa-sign-out-alt"}></i>
                            <p>Log Out</p>
                        </li>
                    </ol>
                </main>
            </div>
            <FootComponent />
        </>
    );
};

export default DashboardPage;