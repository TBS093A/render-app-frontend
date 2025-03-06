// Konfiguracja API
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Konfiguracja aplikacji
export const APP_CONFIG = {
    name: 'Render App',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
};

// Konfiguracja autentykacji
export const AUTH_CONFIG = {
    tokenExpiry: 7, // dni
    refreshTokenExpiry: 30, // dni
    cookieOptions: {
        secure: true,
        sameSite: 'strict',
        path: '/'
    }
}; 