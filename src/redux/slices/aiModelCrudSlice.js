import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAiModels,
    fetchAiModel,
    createAiModel,
    updateAiModel,
    deleteAiModel,
    createAiTask,
    updateAiTask,
    deleteAiTask,
    fetchAiTasks
} from '../asyncThunks/aiModelCrudAsyncThunk';

const initialState = {
    models: [],
    selectedModel: null,
    tasks: [],
    isLoading: false,
    error: null
};

const aiModelCrudSlice = createSlice({
    name: 'aiModelCrud',
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
        builder.addCase(fetchAiModels.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAiModels.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models = action.payload;
        });
        builder.addCase(fetchAiModels.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Fetch Single Model
        builder.addCase(fetchAiModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAiModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedModel = action.payload;
        });
        builder.addCase(fetchAiModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Create Model
        builder.addCase(createAiModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createAiModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models.push(action.payload);
        });
        builder.addCase(createAiModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update Model
        builder.addCase(updateAiModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAiModel.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.models.findIndex(model => model.id === action.payload.id);
            if (index !== -1) {
                state.models[index] = action.payload;
            }
        });
        builder.addCase(updateAiModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete Model
        builder.addCase(deleteAiModel.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteAiModel.fulfilled, (state, action) => {
            state.isLoading = false;
            state.models = state.models.filter(model => model.id !== action.payload);
        });
        builder.addCase(deleteAiModel.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Fetch Tasks
        builder.addCase(fetchAiTasks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchAiTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload;
        });
        builder.addCase(fetchAiTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Create Task
        builder.addCase(createAiTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createAiTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload);
        });
        builder.addCase(createAiTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update Task
        builder.addCase(updateAiTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateAiTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        });
        builder.addCase(updateAiTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete Task
        builder.addCase(deleteAiTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteAiTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        });
        builder.addCase(deleteAiTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { clearError, setSelectedModel } = aiModelCrudSlice.actions;
export const aiModelCrudSelector = (state) => state.aiModelCrud;
export default aiModelCrudSlice.reducer; 