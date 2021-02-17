import { createSlice } from '@reduxjs/toolkit'
import renderCrudAsyncThunk from '../asyncThunks/renderCrudAsyncThunk'

const renderCrudSlice = createSlice(
    {
        name: 'render',
        initialState: {
            models_list: [],
            download_zip_file: ''
        },
        reducers: {},
        extraReducers: {
            [renderCrudAsyncThunk.fetchGetAllRenders.fulfilled.type]: (state, action) => {
                state.renders_list = action.payload.data
            },
            [renderCrudAsyncThunk.fetchGetOneRenderAndDownload.fulfilled.type]: (state, action) => {
                state.download_zip_file = action.payload.data
            }
        }
    }
)

export const renderCrudReducer = renderCrudSlice.reducer

export const renderCrudSelector = state => state.renderCrudReducer