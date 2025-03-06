import { createSlice } from '@reduxjs/toolkit';
import { cookieService } from '../../services/cookieService';

const initialState = {
    user: cookieService.getUserData() || null,
    token: cookieService.getToken() || null,
    isAuthenticated: !!cookieService.getToken(),
    loading: false,
    error: null,
    permissions: []
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
            const { user, token, permissions } = payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.permissions = permissions;
            cookieService.setToken(token);
            cookieService.setUserData({ ...user, permissions });
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.permissions = [];
            cookieService.clearAll();
        },
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setError: (state, { payload }) => {
            state.error = payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { setCredentials, logout, setLoading, setError, clearError } = userAuthSlice.actions;

export const selectCurrentUser = (state) => state.userAuth.user;
export const selectCurrentToken = (state) => state.userAuth.token;
export const selectIsAuthenticated = (state) => state.userAuth.isAuthenticated;
export const selectUserPermissions = (state) => state.userAuth.permissions;
export const selectAuthLoading = (state) => state.userAuth.loading;
export const selectAuthError = (state) => state.userAuth.error;

export default userAuthSlice.reducer; 