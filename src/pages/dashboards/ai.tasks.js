import React, { useState, useRef, useMemo } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';

const AITasksDashboard = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([
        {
            id: 1,
            name: "Model Training - CNN",
            type: "Training",
            status: "Completed",
            progress: 100,
            model: "Object Detection v2",
            startTime: "2024-03-20 09:00:00",
            endTime: "2024-03-20 14:30:00"
        },
        {
            id: 2,
            name: "BERT Fine-tuning",
            type: "Fine-tuning",
            status: "In Progress",
            progress: 75,
            model: "Text Generator",
            startTime: "2024-03-20 10:15:00",
            endTime: null
        },
        {
            id: 3,
            name: "Model Evaluation",
            type: "Evaluation",
            status: "Queued",
            progress: 0,
            model: "Style Transfer v1",
            startTime: null,
            endTime: null
        },
        {
            id: 4,
            name: "Performance Testing",
            type: "Testing",
            status: "Completed",
            progress: 100,
            model: "Face Recognition",
            startTime: "2024-03-19 15:00:00",
            endTime: "2024-03-19 17:30:00"
        },
        {
            id: 5,
            name: "Model Training - RNN",
            type: "Training",
            status: "In Progress",
            progress: 60,
            model: "Language Translator",
            startTime: "2024-03-20 08:45:00",
            endTime: null
        },
        {
            id: 6,
            name: "GAN Training",
            type: "Training",
            status: "Completed",
            progress: 100,
            model: "Image Generation",
            startTime: "2024-03-19 11:00:00",
            endTime: "2024-03-19 18:30:00"
        },
        {
            id: 7,
            name: "Model Optimization",
            type: "Fine-tuning",
            status: "In Progress",
            progress: 82,
            model: "Voice Synthesis",
            startTime: "2024-03-20 09:30:00",
            endTime: null
        },
        {
            id: 8,
            name: "Accuracy Testing",
            type: "Testing",
            status: "Queued",
            progress: 0,
            model: "Pose Estimation",
            startTime: null,
            endTime: null
        },
        {
            id: 9,
            name: "Transfer Learning",
            type: "Training",
            status: "Completed",
            progress: 100,
            model: "Scene Understanding",
            startTime: "2024-03-19 13:15:00",
            endTime: "2024-03-19 16:45:00"
        },
        {
            id: 10,
            name: "Model Validation",
            type: "Evaluation",
            status: "In Progress",
            progress: 45,
            model: "Text Summarizer",
            startTime: "2024-03-20 11:00:00",
            endTime: null
        },
        {
            id: 11,
            name: "Hyperparameter Tuning",
            type: "Fine-tuning",
            status: "Queued",
            progress: 0,
            model: "Speech Recognition",
            startTime: null,
            endTime: null
        },
        {
            id: 12,
            name: "Model Training - YOLO",
            type: "Training",
            status: "Completed",
            progress: 100,
            model: "Object Tracking",
            startTime: "2024-03-19 09:00:00",
            endTime: "2024-03-19 15:30:00"
        },
        {
            id: 13,
            name: "Performance Optimization",
            type: "Fine-tuning",
            status: "In Progress",
            progress: 68,
            model: "Image Segmentation",
            startTime: "2024-03-20 10:00:00",
            endTime: null
        },
        {
            id: 14,
            name: "Model Deployment Test",
            type: "Testing",
            status: "Completed",
            progress: 100,
            model: "Sentiment Analysis",
            startTime: "2024-03-19 14:00:00",
            endTime: "2024-03-19 16:00:00"
        },
        {
            id: 15,
            name: "Model Training - GPT",
            type: "Training",
            status: "In Progress",
            progress: 92,
            model: "Chatbot Model",
            startTime: "2024-03-20 07:30:00",
            endTime: null
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const nameInput = React.createRef();
    const typeInput = React.createRef();
    const statusInput = React.createRef();
    const progressInput = React.createRef();

    const formRefs = [
        nameInput,
        typeInput,
        statusInput,
        progressInput
    ];

    const inputList = [
        {
            type: 'info',
            action: formMode === 'create' ? 'Create' : 'Update',
            endpoint: 'ai/tasks',
            button_value: formMode === 'create' ? '+ AI TASK' : 'UPDATE',
            allowButtonAction: false
        },
        {
            type: 'text',
            name: 'NAME',
            ref: nameInput,
            value: selectedTask?.name || '',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'select',
            name: 'TYPE',
            ref: typeInput,
            options: [
                { value: 'text-to-image', label: 'Text to Image' },
                { value: 'image-to-text', label: 'Image to Text' }
            ],
            value: selectedTask?.type || 'text-to-image',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'select',
            name: 'STATUS',
            ref: statusInput,
            options: [
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Failed', label: 'Failed' },
                { value: 'Cancelled', label: 'Cancelled' }
            ],
            value: selectedTask?.status || 'In Progress',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'number',
            name: 'PROGRESS',
            ref: progressInput,
            value: selectedTask?.progress || 0,
            min: 0,
            max: 100,
            onChange: null,
            validationInfo: null
        }
    ];

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

    const handleFormAction = (refs) => {
        const formData = {};
        refs.forEach((ref, index) => {
            formData[inputList[index].name] = ref.current.value;
        });
        handleFormSubmit(formData);
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

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => 
            task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.model.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [tasks, searchQuery]);

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>AI Training</h2>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Szukaj zadań..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                className="clear-search"
                                onClick={() => setSearchQuery('')}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    <button 
                        className="create-button"
                        onClick={handleCreateTask}
                    >
                        <i className="fas fa-plus"></i>
                        Create Task
                    </button>
                </div>
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
                            inputList={inputList}
                            formRefs={formRefs}
                            onSubmit={handleFormSubmit}
                            onCancel={handleFormCancel}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={filteredTasks}
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