// src/services/task.service.js
import api from './api';

/**
 * RENDER tasks
 */
// Return a list of tasks from the backend
export async function getRenderTasks(status, page = 1, limit = 10) {
  const params = { page, limit };
  if (status) params.status = status;

  const res = await api.get('/renders/tasks', { params });
  return res.data;
}

/**
 * Create a render task (Photo or Video).
 * The backend expects either `photo: {...}` or `video: {...}` in the request body
 */
export async function createRenderTaskPhoto(userId, modelId, renderName) {
  const body = {
    photo: { USER_ID: userId, MODEL_ID: modelId, RENDER_NAME: renderName },
  };
  const res = await api.post('/renders/tasks', body);
  return res.data;
}

export async function createRenderTaskVideo(userId, modelId, renderName, frameStart, frameEnd) {
  const body = {
    video: {
      USER_ID: userId,
      MODEL_ID: modelId,
      RENDER_NAME: renderName,
      FRAME_START: frameStart,
      FRAME_END: frameEnd,
    },
  };
  const res = await api.post('/renders/tasks', body);
  return res.data;
}

// Stop or resume a render task
export async function updateRenderTask(taskId, action) {
  const res = await api.put(`/renders/tasks/${taskId}`, { action });
  return res.data;
}

// Delete (stop) a render task
export async function deleteRenderTask(taskId) {
  const res = await api.delete(`/renders/tasks/${taskId}`);
  return res.data;
}

/**
 * AI tasks
 */
export async function getAiTasks(status, page = 1, limit = 10) {
  const params = { page, limit };
  if (status) params.status = status;

  const res = await api.get('/ai/tasks', { params });
  return res.data;
}

export async function createAiTask(userId) {
  // The backend expects { ai_model: { USER_ID: ... } }
  const body = {
    ai_model: { USER_ID: userId },
  };
  const res = await api.post('/ai/tasks', body);
  return res.data;
}

export async function updateAiTask(taskId, action) {
  const res = await api.put(`/ai/tasks/${taskId}`, { action });
  return res.data;
}

export async function deleteAiTask(taskId) {
  const res = await api.delete(`/ai/tasks/${taskId}`);
  return res.data;
}
