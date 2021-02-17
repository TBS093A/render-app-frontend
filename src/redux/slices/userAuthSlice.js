import { createSlice } from '@reduxjs/toolkit'
import userAuthAsyncThunk from '../asyncThunks/userAuthAsyncThunk'

const userAuthSlice = createSlice(
    {
        name: 'user/auth',
        initialState: {
            token: '',
            user: {
                id: 0,
                username: '',
                email: ''
            }
        },
        reducers: {},
        extraReducers: {
            [userAuthAsyncThunk.fetchLogin.fulfilled.type]: (state, action) => {
                state.token = action.payload.data.Authorization
                state.user.id = action.payload.data.user.id
                state.user.username = action.payload.data.user.username
                state.user.email = action.payload.data.user.email
                state.info = 'login success'
            },
            [userAuthAsyncThunk.fetchLogout.fulfilled.type]: (state, action) => {
                state.token = ''
                state.user.id = 0
                state.user.username = ''
                state.user.email = ''
                state.info = action.payload.data.info
            }
        }
    }
)

export const userAuthReducer = userAuthSlice.reducer

export const userAuthSelector = state => state.userAuthReducer