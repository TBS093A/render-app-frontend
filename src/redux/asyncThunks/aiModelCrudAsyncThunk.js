import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Helper function to get auth header
const getAuthHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const fetchAiModels = createAsyncThunk(
    'aiModelCrud/fetchModels',
    async (_, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/ai/models`, getAuthHeader(token));
        return response.data;
    }
);

export const fetchAiModel = createAsyncThunk(
    'aiModelCrud/fetchModel',
    async (modelId, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.get(`${API_URL}/ai/models/${modelId}`, getAuthHeader(token));
        return response.data;
    }
);

export const createAiModel = createAsyncThunk(
    'aiModelCrud/createModel',
    async (modelData, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.post(`${API_URL}/ai/models`, modelData, getAuthHeader(token));
        return response.data;
    }
);

export const updateAiModel = createAsyncThunk(
    'aiModelCrud/updateModel',
    async ({ modelId, updates }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.put(`${API_URL}/ai/models/${modelId}`, updates, getAuthHeader(token));
        return response.data;
    }
);

export const deleteAiModel = createAsyncThunk(
    'aiModelCrud/deleteModel',
    async (modelId, { getState }) => {
        const { token } = getState().userAuth;
        await axios.delete(`${API_URL}/ai/models/${modelId}`, getAuthHeader(token));
        return modelId;
    }
);

export const fetchAiTasks = createAsyncThunk(
    'aiModelCrud/fetchTasks',
    async ({ status, page = 1, limit = 10 }, { getState }) => {
        const { token } = getState().userAuth;
        const params = { page, limit };
        if (status) params.status = status;
        
        const response = await axios.get(`${API_URL}/ai/tasks`, {
            ...getAuthHeader(token),
            params
        });
        return response.data;
    }
);

export const createAiTask = createAsyncThunk(
    'aiModelCrud/createTask',
    async (taskData, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.post(`${API_URL}/ai/tasks`, taskData, getAuthHeader(token));
        return response.data;
    }
);

export const updateAiTask = createAsyncThunk(
    'aiModelCrud/updateTask',
    async ({ taskId, action }, { getState }) => {
        const { token } = getState().userAuth;
        const response = await axios.put(
            `${API_URL}/ai/tasks/${taskId}`,
            { action },
            getAuthHeader(token)
        );
        return response.data;
    }
);

export const deleteAiTask = createAsyncThunk(
    'aiModelCrud/deleteTask',
    async (taskId, { getState }) => {
        const { token } = getState().userAuth;
        await axios.delete(`${API_URL}/ai/tasks/${taskId}`, getAuthHeader(token));
        return taskId;
    }
); 