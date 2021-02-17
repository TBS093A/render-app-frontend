import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

let endpoint = '/render/'


const fetchGetAllRenders = createAsyncThunk(
    'model/fetchGetAllModels',
    async (
        token,
        thunkAPI
    ) => {
        return await abstractService._getList(endpoint, token)
    }
)

/**
 * @param body:
 *      param token: base64 token,
 *      param id: render id
 */
const fetchGetOneRenderAndDownload = createAsyncThunk(
    'model/fetchGetAllModels',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._getOne(
            trueEndpoint, 
            body.id, 
            body.token
        )
    }
)

export default {
    fetchGetAllRenders,
    fetchGetOneRenderAndDownload
}