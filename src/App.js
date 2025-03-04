// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import DashboardPage from './pages/dashboard';
import LandingPage from './pages/landing';
import NotFoundPage from './pages/404';

import FormLogin from './pages/FormLogin';
import FormRegister from './pages/FormRegister';
import FormModels from './pages/FormModels';
import FormRenders from './pages/FormRenders';
import FormAi from './pages/FormAi';

function App() {
  return (
    <Router>
      <nav style={{ margin: '1rem' }}>
        <Link to="/login" style={{ marginRight: '10px' }}>
          Login
        </Link>
        <Link to="/register" style={{ marginRight: '10px' }}>
          Register
        </Link>
        <Link to="/landing" style={{ marginRight: '10px' }}>
          Offer
        </Link>
        <Link to="/dashboard" style={{ marginRight: '10px' }}>
          Dashboard
        </Link>
        <Link to="/models" style={{ marginRight: '10px' }}>
          Models
        </Link>
        <Link to="/renders" style={{ marginRight: '10px' }}>
          Renders
        </Link>
        <Link to="/ai-tasks" style={{ marginRight: '10px' }}>
          AI Tasks
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/models" element={<FormModels />} />
        <Route path="/renders" element={<FormRenders />} />
        <Route path="/ai-tasks" element={<FormAi />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
