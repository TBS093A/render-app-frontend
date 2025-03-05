import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, changePassword } from '../asyncThunks/userAuthAsyncThunk';

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Register
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Change Password
        builder.addCase(changePassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(changePassword.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { logout, clearError } = userAuthSlice.actions;
export const userAuthSelector = (state) => state.userAuth;
export default userAuthSlice.reducer; 