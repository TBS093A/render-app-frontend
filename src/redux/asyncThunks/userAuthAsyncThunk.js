import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

let endpoint = '/user/auth'

/**
 * @param body:
 *      param username: username string
 *      param password: password string
 */
const fetchLogin = createAsyncThunk(
    'model/fetchGetAllModels',
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

export default {
    fetchLogin
}