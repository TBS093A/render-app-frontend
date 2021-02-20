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
            },
            info: ''
        },
        reducers: {
            deleteUser(state) {
                state.token = ''
                state.user.id = 0
                state.user.username = ''
                state.user.email = ''
                state.info = 'user has been deleted'
            }
        },
        extraReducers: {
            [userAuthAsyncThunk.fetchLogin.fulfilled.type]: (state, action) => {
                try {
                    state.token = action.payload.data.Authorization
                    state.user.id = action.payload.data.user.id
                    state.user.username = action.payload.data.user.username
                    state.user.email = action.payload.data.user.email
                    state.info = 'login success'
                } catch {
                    state.info = 'login failed'
                }
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

export const { deleteUser } = userAuthSlice.actions

export const userAuthSelector = state => state.userAuthReducer