import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to get auth header
const getAuthHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchModels = createAsyncThunk(
    'threeDModelCrud/fetchModels',
    async (_, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/models`, getAuthHeader(token));
        return response.data;
    }
);

export const fetchModel = createAsyncThunk(
    'threeDModelCrud/fetchModel',
    async (modelId, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/models/${modelId}`, getAuthHeader(token));
        return response.data;
    }
);

export const createModel = createAsyncThunk(
    'threeDModelCrud/createModel',
    async (modelData, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.post(`${API_URL}/models`, modelData, getAuthHeader(token));
        return response.data;
    }
);

export const updateModel = createAsyncThunk(
    'threeDModelCrud/updateModel',
    async ({ modelId, updates }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.put(`${API_URL}/models/${modelId}`, updates, getAuthHeader(token));
        return response.data;
    }
);

export const deleteModel = createAsyncThunk(
    'threeDModelCrud/deleteModel',
    async (modelId, { getState }) => {
        const { token } = getState().userAuth;
        await axios.delete(`${API_URL}/models/${modelId}`, getAuthHeader(token));
        return modelId;
    }
);

export const uploadModel = createAsyncThunk(
    'threeDModelCrud/uploadModel',
    async ({ user_id, file, token }) => {
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('file', file);
        formData.append('token', token);

        const response = await axios.post(`${API_URL}/models/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
); 