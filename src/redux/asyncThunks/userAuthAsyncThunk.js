import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, setLoading, setError, logout } from '../slices/userAuthSlice';
import { API_URL, AUTH_CONFIG } from '../../config';
import { cookieService } from '../../services/cookieService';

export const loginUser = createAsyncThunk(
    'userAuth/login',
    async (credentials, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Błąd logowania');
            }

            dispatch(setCredentials({
                user: data.user,
                token: data.token,
                permissions: data.permissions
            }));

            return data;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const registerUser = createAsyncThunk(
    'userAuth/register',
    async (userData, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Błąd rejestracji');
            }

            dispatch(setCredentials({
                user: data.user,
                token: data.token,
                permissions: data.permissions
            }));

            return data;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const logoutUser = createAsyncThunk(
    'userAuth/logout',
    async (_, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const token = cookieService.getToken();
            
            if (token) {
                await fetch(`${API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

            dispatch(logout());
        } catch (error) {
            console.error('Błąd podczas wylogowywania:', error);
        } finally {
            dispatch(setLoading(false));
        }
    }
);

export const checkAuth = createAsyncThunk(
    'userAuth/checkAuth',
    async (_, { dispatch }) => {
        try {
            const token = cookieService.getToken();
            
            if (!token) {
                throw new Error('Brak tokenu');
            }

            const response = await fetch(`${API_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Token nieprawidłowy');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            dispatch(logout());
            throw error;
        }
    }
);

export const changePassword = createAsyncThunk(
    'userAuth/changePassword',
    async (passwordData) => {
        const response = await fetch(`${API_URL}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passwordData),
        });
        return response.data;
    }
);

export const updateProfile = createAsyncThunk(
        'userAuth/updateProfile',
        async (profileData, { rejectWithValue }) => {
            try {
                const response = await fetch(`${API_URL}/user/profile`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${cookieService.getToken()}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(profileData),
                });
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data);
            }
        }
);

export const deleteAccount = createAsyncThunk(
        'userAuth/deleteAccount',
        async (_, { rejectWithValue }) => {
            try {
                const response = await fetch(`${API_URL}/user/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${cookieService.getToken()}`,
                    },
                });
                cookieService.clearAll();
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data);
            }
    }
);