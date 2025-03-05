import { createSlice } from '@reduxjs/toolkit';
import {
    fetchModels,
    fetchModel,
    createModel,
    updateModel,
    deleteModel,
    uploadModel
} from '../asyncThunks/threeDModelCrudAsyncThunk';

const initialState = {
    models: [],
    selectedModel: null,
    isLoading: false,
    error: null,
    upload_blend_file_status: ''
};

const threeDModelCrudSlice = createSlice({
    name: 'threeDModelCrud',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedModel: (state, action) => {
            state.selectedModel = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch Models
        builder.addCase(fetchModels.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchModels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models = action.payload;
        });
        builder.addCase(fetchModels.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Fetch Single Model
        builder.addCase(fetchModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedModel = action.payload;
        });
        builder.addCase(fetchModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Create Model
        builder.addCase(createModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models.push(action.payload);
        });
        builder.addCase(createModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update Model
        builder.addCase(updateModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateModel.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.models.findIndex(model => model.id === action.payload.id);
            if (index !== -1) {
                state.models[index] = action.payload;
            }
        });
        builder.addCase(updateModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete Model
        builder.addCase(deleteModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models = state.models.filter(model => model.id !== action.payload);
        });
        builder.addCase(deleteModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Upload Model
        builder.addCase(uploadModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.upload_blend_file_status = 'uploading';
        });
        builder.addCase(uploadModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.upload_blend_file_status = { info: 'Upload successful' };
        });
        builder.addCase(uploadModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.upload_blend_file_status = { info: 'Upload failed' };
        });
    }
});

export const { clearError, setSelectedModel } = threeDModelCrudSlice.actions;
export const threeDModelCrudSelector = (state) => state.threeDModelCrud;
export default threeDModelCrudSlice.reducer; 