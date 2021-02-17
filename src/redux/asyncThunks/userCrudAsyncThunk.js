import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

let endpoint = '/user/'


const fetchGetAllUsers = createAsyncThunk(
    'user/fetchGetAllUsers',
    async (
        token,
        thunkAPI
    ) => {
        return await abstractService._getList(
            endpoint, 
            token
        )
    }
)

/**
 * @param body:
 *      param token: token
 *      param user_id: user_id
 */
const fetchGetOneUser = createAsyncThunk(
    'user/fetchGetAllUsers',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._getOne(
            endpoint,
            body.user_id, 
            body.token
        )
    }
)

/**
 * @param body:
 *      param username: username string
 *      param password: password string
 *      param email: email string
 */
const fetchRegister = createAsyncThunk(
    'user/fetchRegister',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._post(
            endpoint, 
            body,
            ''
        )
    }
)

/**
 * @param body:
 *      param token: token
 *      param user_id: user_id
 *      param user:
 *          param username: username
 *          param password: password
 *          param email: email
 */
const fetchUpdateUser = createAsyncThunk(
    'user/fetchRegister',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._patch(
            endpoint, 
            body.user_id,
            body.user,
            body.token
        )
    }
)

/**
 * @param body:
 *      param user_id: user_id
 *      param token: user token
 */
const fetchDeleteUser = createAsyncThunk(
    'user/fetchRegister',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._delete(
            endpoint, 
            body.user_id,
            body.token
        )
    }
)

export default {
    fetchGetAllUsers,
    fetchGetOneUser,
    fetchRegister,
    fetchUpdateUser,
    fetchDeleteUser
}