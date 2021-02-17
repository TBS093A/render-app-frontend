import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

let endpoint = '/model/'


const fetchGetAllUsers = createAsyncThunk(
    'model/fetchGetAllModels',
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
 *      param username: username string
 *      param password: password string
 *      param email: email string
 */
const fetchRegister = createAsyncThunk(
    'model/fetchGetAllModels',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._post(
            trueEndpoint, 
            body,
            ''
        )
    }
)

export default {
    fetchGetAllUsers,
    fetchRegister
}