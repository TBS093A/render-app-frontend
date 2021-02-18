import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstracts/abstractService'

let endpoint = '/model/'


const fetchGetAllModels = createAsyncThunk(
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
 *      param id: model id
 */
const fetchGetOneModelAndDownload = createAsyncThunk(
    'model/fetchGetOneModelAndDownload',
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

/**
 * @param body:
 *      param token: base64 token,
 *      param file: file binary
 *      param user_id: user id
 */
const fetchUploadModel = createAsyncThunk(
    'model/fetchUploadModel',
    async (
        body,
        thunkAPI
    ) => {
       return await abstractService.axiosFilePost(
            endpoint,
            body,
            body.token
        )
    }
)

export default {
    fetchGetAllModels,
    fetchGetOneModelAndDownload,
    fetchUploadModel
}