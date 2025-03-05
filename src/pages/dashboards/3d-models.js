import React, { useState, useMemo } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import ModelUploadForm from '../../components/forms/3d_model_crud/threeDModelUpload';

const ThreeDModelsDashboard = () => {
    const [selectedModel, setSelectedModel] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [models, setModels] = useState([
        {
            id: 1,
            name: 'Dragon Model',
            type: 'Blender',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.1'
        },
        {
            id: 2,
            name: 'Medieval Castle',
            type: 'Maya',
            status: 'Inactive',
            lastModified: '2024-03-19',
            version: '1.5'
        },
        {
            id: 3,
            name: 'Sci-fi Weapon',
            type: '3ds Max',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.0'
        },
        {
            id: 4,
            name: 'Forest Scene',
            type: 'Blender',
            status: 'Active',
            lastModified: '2024-03-18',
            version: '3.2'
        },
        {
            id: 5,
            name: 'Robot Character',
            type: 'Maya',
            status: 'Inactive',
            lastModified: '2024-03-17',
            version: '2.0'
        },
        {
            id: 6,
            name: 'Space Ship',
            type: '3ds Max',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.8'
        },
        {
            id: 7,
            name: 'Ancient Temple',
            type: 'Blender',
            status: 'Active',
            lastModified: '2024-03-19',
            version: '2.4'
        },
        {
            id: 8,
            name: 'Fantasy Sword',
            type: 'Maya',
            status: 'Inactive',
            lastModified: '2024-03-16',
            version: '1.2'
        },
        {
            id: 9,
            name: 'City Block',
            type: '3ds Max',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.7'
        },
        {
            id: 10,
            name: 'Warrior Character',
            type: 'Blender',
            status: 'Active',
            lastModified: '2024-03-18',
            version: '1.9'
        },
        {
            id: 11,
            name: 'Futuristic Car',
            type: 'Maya',
            status: 'Inactive',
            lastModified: '2024-03-15',
            version: '1.3'
        },
        {
            id: 12,
            name: 'Mountain Range',
            type: '3ds Max',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '2.2'
        },
        {
            id: 13,
            name: 'Alien Creature',
            type: 'Blender',
            status: 'Active',
            lastModified: '2024-03-19',
            version: '1.6'
        },
        {
            id: 14,
            name: 'Magic Staff',
            type: 'Maya',
            status: 'Active',
            lastModified: '2024-03-20',
            version: '1.4'
        },
        {
            id: 15,
            name: 'Underground Cave',
            type: '3ds Max',
            status: 'Inactive',
            lastModified: '2024-03-17',
            version: '2.3'
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const mockModels = [
        {
            id: 1,
            name: "Dragon Model",
            type: "Character",
            status: "Completed",
            progress: 100
        },
        {
            id: 2,
            name: "Medieval Castle",
            type: "Environment",
            status: "In Progress",
            progress: 65
        },
        {
            id: 3,
            name: "Sci-fi Weapon",
            type: "Prop",
            status: "Queued",
            progress: 0
        },
        {
            id: 4,
            name: "Forest Scene",
            type: "Environment",
            status: "Completed",
            progress: 100
        },
        {
            id: 5,
            name: "Robot Character",
            type: "Character",
            status: "In Progress",
            progress: 45
        },
        {
            id: 6,
            name: "Space Ship",
            type: "Vehicle",
            status: "Completed",
            progress: 100
        },
        {
            id: 7,
            name: "Ancient Temple",
            type: "Environment",
            status: "In Progress",
            progress: 78
        },
        {
            id: 8,
            name: "Fantasy Sword",
            type: "Prop",
            status: "Queued",
            progress: 0
        },
        {
            id: 9,
            name: "City Block",
            type: "Environment",
            status: "Completed",
            progress: 100
        },
        {
            id: 10,
            name: "Warrior Character",
            type: "Character",
            status: "In Progress",
            progress: 89
        },
        {
            id: 11,
            name: "Futuristic Car",
            type: "Vehicle",
            status: "Queued",
            progress: 0
        },
        {
            id: 12,
            name: "Mountain Range",
            type: "Environment",
            status: "Completed",
            progress: 100
        },
        {
            id: 13,
            name: "Alien Creature",
            type: "Character",
            status: "In Progress",
            progress: 34
        },
        {
            id: 14,
            name: "Magic Staff",
            type: "Prop",
            status: "Completed",
            progress: 100
        },
        {
            id: 15,
            name: "Underground Cave",
            type: "Environment",
            status: "In Progress",
            progress: 56
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
        setMessage({ type: 'success', text: '3D Model has been deleted' });
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
                <h2>3D Models</h2>
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
                        onClick={handleCreateModel}
                    >
                        <i className="fas fa-upload"></i>
                        Upload 3D Model
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
                        <ModelUploadForm/>
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
                        <h3>3D Model Details</h3>
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

export default ThreeDModelsDashboard;