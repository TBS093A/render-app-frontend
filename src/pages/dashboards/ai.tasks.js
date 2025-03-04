import React, { useState } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import { FormGenerator } from '../../components/forms/formGenerator';

const AITasksDashboard = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: 'Task A',
            type: 'Training',
            status: 'In Progress',
            lastModified: '2024-03-20',
            progress: 45
        },
        {
            id: 2,
            name: 'Task B',
            type: 'Inference',
            status: 'Completed',
            lastModified: '2024-03-19',
            progress: 100
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleTaskSelect = (task) => {
        setSelectedTask(task);
    };

    const handleTaskAction = (action, task) => {
        switch (action) {
            case 'delete':
                handleDeleteTask(task.id);
                break;
            case 'edit':
                handleEditTask(task);
                break;
            case 'cancel':
                handleCancelTask(task.id);
                break;
            case 'restart':
                handleRestartTask(task.id);
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    const handleCreateTask = () => {
        setFormMode('create');
        setIsFormVisible(true);
        setSelectedTask(null);
    };

    const handleEditTask = (task) => {
        setFormMode('edit');
        setIsFormVisible(true);
        setSelectedTask(task);
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
        if (selectedTask?.id === taskId) {
            setSelectedTask(null);
        }
        setMessage({ type: 'success', text: 'Task has been deleted' });
    };

    const handleCancelTask = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, status: 'Cancelled', progress: 0 }
                : task
        ));
        setMessage({ type: 'success', text: 'Task has been cancelled' });
    };

    const handleRestartTask = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId 
                ? { ...task, status: 'In Progress', progress: 0 }
                : task
        ));
        setMessage({ type: 'success', text: 'Task has been restarted' });
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            const newTask = {
                id: tasks.length + 1,
                ...formData,
                lastModified: new Date().toISOString().split('T')[0],
                status: 'In Progress',
                progress: 0
            };
            setTasks([...tasks, newTask]);
            setMessage({ type: 'success', text: 'Task has been created' });
        } else {
            setTasks(tasks.map(task => 
                task.id === selectedTask.id 
                    ? { ...task, ...formData, lastModified: new Date().toISOString().split('T')[0] }
                    : task
            ));
            setMessage({ type: 'success', text: 'Task has been updated' });
        }
        setIsFormVisible(false);
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
        setSelectedTask(null);
    };

    const getTaskActions = (task) => {
        const actions = [];
        
        if (task.status === 'In Progress') {
            actions.push({
                label: 'Cancel',
                action: 'cancel',
                className: 'cancel-button'
            });
        } else if (task.status === 'Completed' || task.status === 'Cancelled') {
            actions.push({
                label: 'Restart',
                action: 'restart',
                className: 'restart-button'
            });
        }

        actions.push(
            {
                label: 'Edit',
                action: 'edit',
                className: 'update-button'
            },
            {
                label: 'Delete',
                action: 'delete',
                className: 'delete-button'
            }
        );

        return actions;
    };

    const formFields = [
        {
            name: 'name',
            label: 'Task Name',
            type: 'text',
            required: true,
            value: selectedTask?.name || ''
        },
        {
            name: 'type',
            label: 'Task Type',
            type: 'select',
            required: true,
            options: [
                { value: 'Training', label: 'Training' },
                { value: 'Inference', label: 'Inference' },
                { value: 'Evaluation', label: 'Evaluation' }
            ],
            value: selectedTask?.type || 'Training'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Failed', label: 'Failed' },
                { value: 'Cancelled', label: 'Cancelled' }
            ],
            value: selectedTask?.status || 'In Progress'
        }
    ];

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>AI Tasks</h2>
                <button 
                    className="create-button"
                    onClick={handleCreateTask}
                >
                    <i className="fas fa-plus"></i>
                    Task
                </button>
            </div>

            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            {isFormVisible && (
                <div className="form-overlay">
                    <div className="form-container">
                        <FormGenerator
                            fields={formFields}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                            title={formMode === 'create' ? 'Create new task' : 'Edit task'}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={tasks}
                selectedItem={selectedTask}
                onItemSelect={handleTaskSelect}
                onItemAction={handleTaskAction}
                getItemActions={getTaskActions}
                renderItem={(task) => (
                    <div className="list-row">
                        <div className="item-info">
                            <div className="item-name">{task.name}</div>
                            <div className="item-type">{task.type}</div>
                            <div className={`item-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                                {task.status}
                            </div>
                            <div className="item-progress">
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${task.progress}%` }}
                                    />
                                </div>
                                <span>{task.progress}%</span>
                            </div>
                        </div>
                        <div className="item-details">
                            <div>Last Modified: {task.lastModified}</div>
                        </div>
                    </div>
                )}
                renderDetails={(task) => (
                    <div className="details-panel">
                        <h3>Task Details</h3>
                        <div className="detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{task.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{task.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Type:</span>
                            <span className="detail-value">{task.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{task.status}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Progress:</span>
                            <span className="detail-value">{task.progress}%</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Last Modified:</span>
                            <span className="detail-value">{task.lastModified}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default AITasksDashboard; 