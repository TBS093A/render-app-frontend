import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const loginUser = createAsyncThunk(
    'userAuth/login',
    async (credentials) => {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        const response = await axios.post(`${API_URL}/auth`, formData);
        return response.data;
    }
);

export const registerUser = createAsyncThunk(
    'userAuth/register',
    async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    }
);

export const changePassword = createAsyncThunk(
    'userAuth/changePassword',
    async (passwordData) => {
        const response = await axios.post(`${API_URL}/change-password`, passwordData);
        return response.data;
    }
); 