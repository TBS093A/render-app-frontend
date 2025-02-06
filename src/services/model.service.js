// src/services/model.service.js
import api from './api';

/**
 * Fetch a paginated list of models
 */
export async function getModels(page = 1, limit = 10) {
  const res = await api.get('/models', { params: { page, limit } });
  return res.data;
}

/**
 * Create a new model:
 * 1) Request a presigned URL from backend
 * 2) PUT the file to S3
 * 3) POST the model data with s3Key to backend
 */
export async function createModel(name, file) {
  // get presigned URL from your backend
  const presignRes = await api.post('/models/upload_url', { fileName: file.name });
  const { url, key } = presignRes.data; // e.g. { url, key }

  // upload file to S3
  await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  // call actual model creation
  const createRes = await api.post('/models', {
    name,
    s3Key: key,
  });
  return createRes.data;
}

/**
 * Update an existing model (similar approach)
 */
export async function updateModel(modelId, newName, newFile) {
  let s3Key;
  if (newFile) {
    // 1) get presigned URL
    const presignRes = await api.post('/models/upload_url', { fileName: newFile.name });
    const { url, key } = presignRes.data;

    // 2) PUT file to S3
    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': newFile.type },
      body: newFile,
    });
    s3Key = key;
  }

  // 3) call PUT /models/{id} with updated fields
  const payload = {};
  if (newName) payload.name = newName;
  if (s3Key) payload.s3Key = s3Key;

  const updateRes = await api.put(`/models/${modelId}`, payload);
  return updateRes.data;
}

/**
 * Delete model
 */
export async function deleteModel(modelId) {
  const res = await api.delete(`/models/${modelId}`);
  return res.data;
}
