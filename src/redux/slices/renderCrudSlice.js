import { createSlice } from '@reduxjs/toolkit';
import {
    fetchRenders,
    fetchRender,
    updateRender,
    deleteRender,
    fetchRenderTasks,
    createRenderTask,
    updateRenderTask,
    deleteRenderTask
} from '../asyncThunks/renderCrudAsyncThunk';

const initialState = {
    renders: [],
    selectedRender: null,
    tasks: [],
    isLoading: false,
    error: null
};

const renderCrudSlice = createSlice({
    name: 'renderCrud',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setSelectedRender: (state, action) => {
            state.selectedRender = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Fetch Renders
        builder.addCase(fetchRenders.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchRenders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.renders = action.payload;
        });
        builder.addCase(fetchRenders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Fetch Single Render
        builder.addCase(fetchRender.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchRender.fulfilled, (state, action) => {
            state.isLoading = false;
            state.selectedRender = action.payload;
        });
        builder.addCase(fetchRender.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update Render
        builder.addCase(updateRender.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateRender.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.renders.findIndex(render => render.id === action.payload.id);
            if (index !== -1) {
                state.renders[index] = action.payload;
            }
        });
        builder.addCase(updateRender.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete Render
        builder.addCase(deleteRender.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteRender.fulfilled, (state, action) => {
            state.isLoading = false;
            state.renders = state.renders.filter(render => render.id !== action.payload);
        });
        builder.addCase(deleteRender.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Fetch Tasks
        builder.addCase(fetchRenderTasks.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchRenderTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload;
        });
        builder.addCase(fetchRenderTasks.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Create Task
        builder.addCase(createRenderTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createRenderTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload);
        });
        builder.addCase(createRenderTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Update Task
        builder.addCase(updateRenderTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateRenderTask.fulfilled, (state, action) => {
            state.isLoading = false;
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        });
        builder.addCase(updateRenderTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        // Delete Task
        builder.addCase(deleteRenderTask.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteRenderTask.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        });
        builder.addCase(deleteRenderTask.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

export const { clearError, setSelectedRender } = renderCrudSlice.actions;
export const renderCrudSelector = (state) => state.renderCrud;
export default renderCrudSlice.reducer; 