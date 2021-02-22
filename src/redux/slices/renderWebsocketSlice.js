import { createSlice } from '@reduxjs/toolkit'
import renderWebsocketAsyncThunk from '../asyncThunks/renderWebsocketAsyncThunk'

import { GeneralAddressWS } from '../asyncThunks/abstracts/abstractAddress'


const __uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
        }
    )
}

const initialState = {
    web_socket_address: '',
    address: '',
    room_uuid: '',
    messages: [],
    percents: 0.0,
    connected: false
}

const renderWebsocketSlice = createSlice(
    {
        name: 'render/async',
        initialState,
        reducers: {
            connect(state, action) {
                state.room_uuid = __uuidv4()
                state.address = GeneralAddressWS + action.payload.address 
                state.web_socket_address = state.address + state.room_uuid
                state.messages = []
                state.percents = 0.0
                state.connected = true
            },
            saveMessage(state, action) {
                state.messages = [
                    ...state.messages,
                    action.payload.message
                ]
                if (
                    (
                        !isNaN(action.payload.message.info) 
                        && action.payload.message.info.toString().indexOf('.') != -1
                    ) || action.payload.message.info === 'render success'
                ) {
                    state.percents = action.payload.message.info
                }
            },
            resetMessages(state) {
                state.messages = []
                state.percents = ''
            },
            disconnect(state) {
                state.web_socket_address = ''
                state.address = ''
                state.room_uuid = ''
                state.messages = []
                state.connected = false
            }
        },
        extraReducers: {}
    }
)

export const renderWebsocketReducer = renderWebsocketSlice.reducer

export const { connect, saveMessage, disconnect } = renderWebsocketSlice.actions

export const renderWebsocketSelector = state => state.renderWebsocketReducer