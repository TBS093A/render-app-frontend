import { createAsyncThunk } from '@reduxjs/toolkit'
import abstractService from './abstractService'

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

/**
 * @param body:
 *      param token: base64 token,
 *      param file: document.querySelector('#file').files[0]
 *      param user_id: user id
 */
const fetchUploadModel = createAsyncThunk(
    'model/fetchGetAllModels',
    async (
        body,
        thunkAPI
    ) => {
        let formData = FormData()
        formData.append("blend", body.file)
        body.file = formData
        return await abstractService._post(
            trueEndpoint, 
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