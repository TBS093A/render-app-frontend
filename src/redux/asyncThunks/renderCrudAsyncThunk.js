import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstracts/abstractService'

let endpoint = '/render/'


const fetchGetAllRenders = createAsyncThunk(
    'render/fetchGetAllRenders',
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
    'render/fetchGetOneRenderAndDownload',
    async (
        body,
        thunkAPI
    ) => {
        return await abstractService._getOne(
            endpoint, 
            body.id, 
            body.token
        )
    }
)

export default {
    fetchGetAllRenders,
    fetchGetOneRenderAndDownload
}