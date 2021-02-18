import { createSlice } from '@reduxjs/toolkit'
import modelCrudAsyncThunk from '../asyncThunks/modelCrudAsyncThunk'

const modelCrudSlice = createSlice(
    {
        name: 'model',
        initialState: {
            models_list: [],
            download_blend_file: '',
            upload_blend_file_status: ''
        },
        reducers: {},
        extraReducers: {
            [modelCrudAsyncThunk.fetchGetAllModels.fulfilled.type]: (state, action) => {
                state.models_list = action.payload.data
            },
            [modelCrudAsyncThunk.fetchGetOneModelAndDownload.fulfilled.type]: (state, action) => {
                state.download_blend_file = action.payload.data
            },
            [modelCrudAsyncThunk.fetchUploadModel.fulfilled.type]: (state, action) => {
                state.upload_blend_file_status = action.payload.data
            }
        }
    }
)

export const modelCrudReducer = modelCrudSlice.reducer

export const modelCrudSelector = state => state.modelCrudReducer