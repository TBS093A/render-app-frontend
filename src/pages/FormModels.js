import React, { useEffect, useState } from 'react';
import { getModels, createModel, deleteModel } from '../services/model.service';

function FormModels() {
  const [models, setModels] = useState([]);
  const [modelName, setModelName] = useState('');
  const [file, setFile] = useState(null);

  const fetchModels = async () => {
    try {
      const data = await getModels();
      setModels(data.items || []);
    } catch (error) {
      console.error(error);
      alert('Failed to load models');
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleCreateModel = async (e) => {
    e.preventDefault();
    if (!modelName || !file) {
      alert('Please provide name and file');
      return;
    }

    try {
      await createModel(modelName, file);
      setModelName('');
      setFile(null);
      alert('Model created successfully');
      fetchModels();
    } catch (err) {
      console.error(err);
      alert('Failed to create model');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteModel(id);
      fetchModels();
    } catch (error) {
      console.error(error);
      alert('Error deleting model');
    }
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h2>Models</h2>
      <form onSubmit={handleCreateModel}>
        <input
          type="text"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button type="submit">Create Model</button>
      </form>

      <ul>
        {models.map((m) => (
          <li key={m.id}>
            {m.name} (ID: {m.id}){' '}
            <button onClick={() => handleDelete(m.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormModels;
