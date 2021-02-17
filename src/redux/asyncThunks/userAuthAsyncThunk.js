import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

let endpoint = '/user/auth'

/**
 * @param body:
 *      param username: username string
 *      param password: password string
 */
const fetchLogin = createAsyncThunk(
    'user/auth/fetchLogin',
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
 *      param token: user token
 */
const fetchLogout = createAsyncThunk(
    'user/auth/fetchLogout',
    async (
        token,
        thunkAPI
    ) => {
        return await abstractService._delete(
            endpoint, 
            '',
            token
        )
    }
)

export default {
    fetchLogin,
    fetchLogout
}