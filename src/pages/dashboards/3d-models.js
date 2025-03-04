import React, { useState } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import { FormGenerator } from '../../components/forms/formGenerator';

const ThreeDModelsDashboard = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [models, setModels] = useState([
        {
            id: 1,
            name: 'Model A',
            type: '3D',
            status: 'Active',
            lastModified: '2024-03-20',
            size: '2.5MB'
        },
        {
            id: 2,
            name: 'Model B',
            type: '3D',
            status: 'Inactive',
            lastModified: '2024-03-19',
            size: '1.8MB'
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create' lub 'edit'
    const [message, setMessage] = useState({ type: '', text: '' });

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
        setMessage({ type: 'success', text: 'Model has been deleted' });
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
            setMessage({ type: 'success', text: 'Model has been created' });
        } else {
            setModels(models.map(model => 
                model.id === selectedModel.id 
                    ? { ...model, ...formData, lastModified: new Date().toISOString().split('T')[0] }
                    : model
            ));
            setMessage({ type: 'success', text: 'Model has been updated' });
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

    const formFields = [
        {
            name: 'name',
            label: 'Model Name',
            type: 'text',
            required: true,
            value: selectedModel?.name || ''
        },
        {
            name: 'type',
            label: 'Model Type',
            type: 'select',
            required: true,
            options: [
                { value: '3D', label: '3D' },
                { value: '2D', label: '2D' }
            ],
            value: selectedModel?.type || '3D'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' }
            ],
            value: selectedModel?.status || 'Active'
        }
    ];

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>3D Models</h2>
                <button 
                    className="create-button"
                    onClick={handleCreateModel}
                >
                    <i className="fas fa-plus"></i>
                    3D Model
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
                            title={formMode === 'create' ? 'Create new model' : 'Edit model'}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={models}
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
                            <div>Last Modified: {model.lastModified}</div>
                            <div>Size: {model.size}</div>
                        </div>
                    </div>
                )}
                renderDetails={(model) => (
                    <div className="details-panel">
                        <h3>Model Details</h3>
                        <div className="detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{model.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Nazwa:</span>
                            <span className="detail-value">{model.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Typ:</span>
                            <span className="detail-value">{model.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{model.status}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Last Modified:</span>
                            <span className="detail-value">{model.lastModified}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Size:</span>
                            <span className="detail-value">{model.size}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default ThreeDModelsDashboard;