// src/services/api.js
import axios from 'axios';
import { getCookie } from './cookie';

const api = axios.create({
  baseURL: 'http://0.0.0.0:9090', 
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
