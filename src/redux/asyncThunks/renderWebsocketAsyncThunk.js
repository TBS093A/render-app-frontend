import { createAsyncThunk } from '@reduxjs/toolkit'
import GeneralAddress from './abstractAddress'

let endpoint_single_image = '/render/single/image/'
let endpoint_single_set = '/render/single/set/'
let endpoint_all = '/render/all/'

let endpoint_vector_single_image = '/render/vector/single/image/'
let endpoint_vector_single_set = '/render/vector/single/set/'


const __uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
        }
    )
}

/**
 * 
 * @param {string} endpoint:
 *      examples:
 *          'image' - connect to single image ws renderer 
 *          'set' - connect to single set ws renderer
 *          'all' - connect to all ws renderer
 * 
 *          'vector/image' - connect to vector single image ws renderer
 *          'vector/set' - connerct to vector single set ws renderer
 */
const __make_address = async (endpoint) => {
    if (endpoint === 'image')
        endpoint = endpoint_single_image
    else if (endpoint === 'set')
        endpoint = endpoint_single_set
    else if (endpoint === 'all')
        endpoint = endpoint_all
    else if (endpoint === 'vector/image')
        endpoint = endpoint_vector_single_image
    else if (endpoint === 'vector/set')
        endpoint = endpoint_vector_single_set

    return GeneralAddress + endpoint
}

/**
 *  @param body:
 *      param token: token
 *      param endpoint:
 *          examples:
 *          'image' - connect to single image ws renderer 
 *          'set' - connect to single set ws renderer
 *          'all' - connect to all ws renderer
 * 
 *          'vector/image' - connect to vector single image ws renderer
 *          'vector/set' - connerct to vector single set ws renderer
 */
const fetchConnect = createAsyncThunk(
    'render/async/fetchConnect',
    async (
        body,
        thunkAPI
    ) => {
        let uuid = __uuidv4()
        let address = __make_address(body.endpoint)
        return {
            web_socket: new WebSocket(address + uuid),
            address: address,
            room_uuid: uuid
        }
    }
)

/**
 *  @param body:
 *      param token: token
 *      param message: message string
 */
const fetchSaveMessage = createAsyncThunk(
    'render/async/fetchSaveMessage',
    async (
        body,
        thunkAPI
    ) => {
        return {
            message: body.message
        }
    }
)

/**
 *  @param body:
 *      param token: token
 */
const fetchDisconnect = createAsyncThunk(
    'render/async/fetchDisconnect',
    async (
        token,
        thunkAPI
    ) => {
        return {
            web_socket: null,
        }
    }
)

export default {
    fetchConnect,
    fetchSaveMessage,
    fetchDisconnect,
}