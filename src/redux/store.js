import { configureStore } from '@reduxjs/toolkit';

import { loadState, saveState } from './stateLoader'
import lodash from 'lodash'

import { modelCrudReducer } from './slices/modelCrudSlice'
import { renderCrudReducer } from './slices/renderCrudSlice'
import { renderWebsocketReducer } from './slices/renderWebsocketSlice'
import { userAuthReducer } from './slices/userAuthSlice'
import { userCrudReducer } from './slices/userCrudSlice'


let persistedState = null

if (typeof window !== `undefined`) {
    persistedState = loadState()
}

export const store = typeof window !== `undefined`
    ? configureStore({
        reducer: {
            modelCrudReducer,
            renderCrudReducer,
            renderWebsocketReducer,
            userAuthReducer,
            userCrudReducer
        },
        preloadedState: persistedState
    })
    : 0

if (typeof window !== `undefined`) {

    store.subscribe(() => {
        saveState(store.getState());
    });

    store.subscribe(lodash.throttle(() => {
        saveState(store.getState())
    }, 100))

}
