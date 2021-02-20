import { createSlice } from '@reduxjs/toolkit'
import userCrudAsyncThunk from '../asyncThunks/userCrudAsyncThunk'

const userCrudSlice = createSlice(
    {
        name: 'user',
        initialState: {
            users_list: [],
            user_get: {},
            user_register: {
                id: -1,
                username: '',
                email: ''
            },
            user_update: {},
            user_delete: '',
            info: ''
        },
        reducers: {},
        extraReducers: {
            [userCrudAsyncThunk.fetchGetAllUsers.fulfilled.type]: (state, action) => {
                state.users_list = action.payload.data
            },
            [userCrudAsyncThunk.fetchGetOneUser.fulfilled.type]: (state, action) => {
                state.user_get = action.payload.data
            },
            [userCrudAsyncThunk.fetchRegister.fulfilled.type]: (state, action) => {
                try {
                    state.user_register.id = action.payload.data.id
                    state.user_register.username = action.payload.data.username
                    state.user_register.email = action.payload.data.email
                    state.info = 'register success'
                } catch {
                    state.info = 'register failed'
                }
            },
            [userCrudAsyncThunk.fetchUpdateUser.fulfilled.type]: (state, action) => {
                state.user_update = action.payload.data
            },
            [userCrudAsyncThunk.fetchDeleteUser.fulfilled.type]: (state, action) => {
                state.users_list = []
                state.user_get = {}
                state.user_register = {}
                state.user_update = {}
                state.user_delete = 'true'
            }
        }
    }
)

export const userCrudReducer = userCrudSlice.reducer

export const userCrudSelector = state => state.userCrudReducer