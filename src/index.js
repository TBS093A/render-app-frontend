// import React from 'react';
// 
// import LoginPage from './pages/user/login.js';
// import LandingPage from './pages/Landing.js';
// 
// const IndexPage = () => {
//     return (
//         <LandingPage />
//     )
// }
// 
// 
// export default IndexPage

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

