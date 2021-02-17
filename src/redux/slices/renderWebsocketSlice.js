import { createSlice } from '@reduxjs/toolkit'
import renderWebsocketAsyncThunk from '../asyncThunks/renderWebsocketAsyncThunk'

const renderWebsocketSlice = createSlice(
    {
        name: 'render/async',
        initialState: {
            web_socket: null,
            address: '',
            room_uuid: '',
            messages: [],
            connected: false
        },
        reducers: {},
        extraReducers: {
            [renderWebsocketAsyncThunk.fetchConnect.fulfilled.type]: (state, action) => {
                state.web_socket = action.web_socket
                state.address = action.address
                state.room_uuid = action.room_uuid
                state.messages = []
                state.connected = true
            },
            [renderWebsocketAsyncThunk.fetchSaveMessage.fulfilled.type]: (state, action) => {
                state.messages = [
                    ...state.messages,
                    action.message
                ]
            },
            [renderWebsocketAsyncThunk.fetchDisconnect.fulfilled.type]: (state, action) => {
                state.web_socket = action.web_socket,
                state.address = '',
                state.room_uuid = '',
                state.messages = [],
                state.connected = false
            }
        }
    }
)

export const renderWebsocketReducer = renderWebsocketSlice.reducer

export const renderWebsocketSelector = state => state.renderWebsocketReducer