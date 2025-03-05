import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to get auth header
const getAuthHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchRenders = createAsyncThunk(
    'renderCrud/fetchRenders',
    async ({ page = 1, limit = 10 }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/renders`, {
            ...getAuthHeader(token),
            params: { page, limit }
        });
        return response.data;
    }
);

export const fetchRender = createAsyncThunk(
    'renderCrud/fetchRender',
    async (renderId, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/renders/${renderId}`, getAuthHeader(token));
        return response.data;
    }
);

export const updateRender = createAsyncThunk(
    'renderCrud/updateRender',
    async ({ renderId, updates }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.put(`${API_URL}/renders/${renderId}`, updates, getAuthHeader(token));
        return response.data;
    }
);

export const deleteRender = createAsyncThunk(
    'renderCrud/deleteRender',
    async (renderId, { getState }) => {
        const { token } = getState().userAuth;
        await axios.delete(`${API_URL}/renders/${renderId}`, getAuthHeader(token));
        return renderId;
    }
);

export const fetchRenderTasks = createAsyncThunk(
    'renderCrud/fetchTasks',
    async ({ status, page = 1, limit = 10 }, { getState }) => {
        const { token } = getState().userAuth;
        const params = { page, limit };
        if (status) params.status = status;
        
        const response = await axios.get(`${API_URL}/renders/tasks`, {
            ...getAuthHeader(token),
            params
        });
        return response.data;
    }
);

export const createRenderTask = createAsyncThunk(
    'renderCrud/createTask',
    async (taskData, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.post(`${API_URL}/renders/tasks`, taskData, getAuthHeader(token));
        return response.data;
    }
);

export const updateRenderTask = createAsyncThunk(
    'renderCrud/updateTask',
    async ({ taskId, action }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.put(
            `${API_URL}/renders/tasks/${taskId}`,
            { action },
            getAuthHeader(token)
        );
        return response.data;
    }
);

export const deleteRenderTask = createAsyncThunk(
    'renderCrud/deleteTask',
    async (taskId, { getState }) => {
        const { token } = getState().userAuth;
        await axios.delete(`${API_URL}/renders/tasks/${taskId}`, getAuthHeader(token));
        return taskId;
    }
); 