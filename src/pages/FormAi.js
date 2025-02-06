import React, { useEffect, useState } from 'react';
import { getAiTasks, createAiTask, updateAiTask, deleteAiTask } from '../services/task.service';

function FormAi() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await getAiTasks();
      setTasks(data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load AI tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    const userId = 123; // Example user ID
    try {
      await createAiTask(userId);
      alert('AI task created');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to create AI task');
    }
  };

  const handleStop = async (taskId) => {
    try {
      await updateAiTask(taskId, 'stop');
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to stop AI task');
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteAiTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert('Failed to delete AI task');
    }
  };

  return (
    <div style={{ margin: '1rem' }}>
      <h2>AI Tasks</h2>
      <button onClick={handleCreate}>Create AI Task</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            Task ID: {t._id}, Status: {t.status}&nbsp;
            <button onClick={() => handleStop(t._id)}>Stop</button>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormAi;
