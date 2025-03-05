import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userAuthSlice';
import threeDModelCrudReducer from './slices/threeDModelCrudSlice';
import aiModelCrudReducer from './slices/aiModelCrudSlice';
import renderCrudReducer from './slices/renderCrudSlice';

export const store = configureStore({
    reducer: {
        userAuth: userAuthReducer,
        threeDModelCrud: threeDModelCrudReducer,
        aiModelCrud: aiModelCrudReducer,
        renderCrud: renderCrudReducer
    }
}); 