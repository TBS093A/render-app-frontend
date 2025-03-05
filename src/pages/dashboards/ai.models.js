import React, { useState, useRef, useMemo } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';
import AIModelUploadForm from '../../components/forms/ai_model_crud/AIModelUpload';

const AIModelsDashboard = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [models, setModels] = useState([
        {
            id: 1,
            name: 'stable-diffusion',
            type: 'text-to-image',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.1'
        },
        {
            id: 2,
            name: 'gpt-4',
            type: 'text-generation',
            status: 'Inactive',
            lastModified: '2024-03-19',
            version: '1.0'
        },
        {
            id: 3,
            name: 'yolo-v8',
            type: 'object-detection',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.2'
        },
        {
            id: 4,
            name: 'wav2vec',
            type: 'speech-recognition',
            status: 'Active',
            lastModified: '2024-03-18',
            version: '3.0'
        },
        {
            id: 5,
            name: 'bert-base',
            type: 'text-classification',
            status: 'Inactive',
            lastModified: '2024-03-17',
            version: '2.0'
        },
        {
            id: 6,
            name: 'resnet-50',
            type: 'image-classification',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.8'
        },
        {
            id: 7,
            name: 'detr',
            type: 'object-detection',
            status: 'Active',
            lastModified: '2024-03-19',
            version: '2.4'
        },
        {
            id: 8,
            name: 'whisper',
            type: 'speech-recognition',
            status: 'Inactive',
            lastModified: '2024-03-16',
            version: '1.2'
        },
        {
            id: 9,
            name: 'dalle-3',
            type: 'text-to-image',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.7'
        },
        {
            id: 10,
            name: 'llama-2',
            type: 'text-generation',
            status: 'Active',
            lastModified: '2024-03-18',
            version: '1.9'
        },
        {
            id: 11,
            name: 'mask-rcnn',
            type: 'image-segmentation',
            status: 'Inactive',
            lastModified: '2024-03-15',
            version: '1.3'
        },
        {
            id: 12,
            name: 'roberta',
            type: 'text-classification',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.2'
        },
        {
            id: 13,
            name: 'dino',
            type: 'image-classification',
            status: 'Active',
            lastModified: '2024-03-19',
            version: '1.6'
        },
        {
            id: 14,
            name: 'sam',
            type: 'image-segmentation',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.4'
        },
        {
            id: 15,
            name: 'clip',
            type: 'image-text',
            status: 'Inactive',
            lastModified: '2024-03-17',
            version: '2.3'
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const nameInput = React.createRef();
    const typeInput = React.createRef();
    const versionInput = React.createRef();
    const statusInput = React.createRef();

    const formRefs = [
        nameInput,
        typeInput,
        versionInput,
        statusInput
    ];

    const inputList = [
        {
            type: 'info',
            action: formMode === 'create' ? 'Create' : 'Update',
            endpoint: 'ai/models',
            button_value: formMode === 'create' ? '+ AI MODEL' : 'UPDATE',
            allowButtonAction: false
        },
        {
            type: 'text',
            name: 'NAME',
            ref: nameInput,
            value: selectedModel?.name || '',
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
            value: selectedModel?.type || 'text-to-image',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'text',
            name: 'VERSION',
            ref: versionInput,
            value: selectedModel?.version || '1.0',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'select',
            name: 'STATUS',
            ref: statusInput,
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
            ],
            value: selectedModel?.status || 'Active',
            onChange: null,
            validationInfo: null
        }
    ];

    const handleModelSelect = (model) => {
        setSelectedModel(model);
    };

    const handleModelAction = (action, model) => {
        switch (action) {
            case 'delete':
                handleDeleteModel(model.id);
                break;
            case 'edit':
                handleEditModel(model);
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    const handleCreateModel = () => {
        setFormMode('create');
        setIsFormVisible(true);
        setSelectedModel(null);
    };

    const handleEditModel = (model) => {
        setFormMode('edit');
        setIsFormVisible(true);
        setSelectedModel(model);
    };

    const handleDeleteModel = (modelId) => {
        setModels(models.filter(model => model.id !== modelId));
        if (selectedModel?.id === modelId) {
            setSelectedModel(null);
        }
        setMessage({ type: 'success', text: 'AI Model has been deleted' });
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            const newModel = {
                id: models.length + 1,
                ...formData,
                lastModified: new Date().toISOString().split('T')[0],
                status: 'Active'
            };
            setModels([...models, newModel]);
            setMessage({ type: 'success', text: 'AI Model has been created' });
        } else {
            setModels(models.map(model => 
                model.id === selectedModel.id 
                    ? { ...model, ...formData, lastModified: new Date().toISOString().split('T')[0] }
                    : model
            ));
            setMessage({ type: 'success', text: 'AI Model has been updated' });
        }
        setIsFormVisible(false);
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
        setSelectedModel(null);
    };

    const getModelActions = (model) => {
        return [
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
        ];
    };

    const filteredModels = useMemo(() => {
        return models.filter(model => 
            model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            model.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [models, searchQuery]);

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>AI Models</h2>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Szukaj modeli..."
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
                        onClick={() => setIsFormVisible(true)}
                    >
                        <i className="fas fa-upload"></i>
                        Upload AI Model
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
                        <AIModelUploadForm />
                    </div>
                </div>
            )}

            <ListGenerator
                data={filteredModels}
                selectedItem={selectedModel}
                onItemSelect={handleModelSelect}
                onItemAction={handleModelAction}
                getItemActions={getModelActions}
                renderItem={(model) => (
                    <div className="list-row">
                        <div className="item-info">
                            <div className="item-name">{model.name}</div>
                            <div className="item-type">{model.type}</div>
                            <div className={`item-status ${model.status.toLowerCase()}`}>
                                {model.status}
                            </div>
                        </div>
                        <div className="item-details">
                            <div>Version: {model.version}</div>
                            <div>Last Modified: {model.lastModified}</div>
                        </div>
                    </div>
                )}
                renderDetails={(model) => (
                    <div className="details-panel">
                        <h3>AI Model Details</h3>
                        <div className="detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{model.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Name:</span>
                            <span className="detail-value">{model.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Type:</span>
                            <span className="detail-value">{model.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Version:</span>
                            <span className="detail-value">{model.version}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{model.status}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Last Modified:</span>
                            <span className="detail-value">{model.lastModified}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default AIModelsDashboard;

