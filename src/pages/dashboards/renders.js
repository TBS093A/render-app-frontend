import React, { useState, useRef, useMemo } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';

const RendersDashboard = () => {
    const [selectedRender, setSelectedRender] = useState(null);
    const [renders, setRenders] = useState([
        {
            id: 1,
            name: "Character Animation",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Hero Character",
            startTime: "2024-03-20 09:00:00",
            endTime: "2024-03-20 11:30:00"
        },
        {
            id: 2,
            name: "Environment Lighting",
            type: "Still",
            status: "In Progress",
            progress: 75,
            model: "Forest Scene",
            startTime: "2024-03-20 10:15:00",
            endTime: null
        },
        {
            id: 3,
            name: "Product Showcase",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Sports Car",
            startTime: null,
            endTime: null
        },
        {
            id: 4,
            name: "Battle Scene",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Warriors",
            startTime: "2024-03-19 15:00:00",
            endTime: "2024-03-19 18:30:00"
        },
        {
            id: 5,
            name: "Architectural Visualization",
            type: "Still",
            status: "In Progress",
            progress: 60,
            model: "Modern House",
            startTime: "2024-03-20 08:45:00",
            endTime: null
        },
        {
            id: 6,
            name: "Character Portrait",
            type: "Still",
            status: "Completed",
            progress: 100,
            model: "Fantasy Character",
            startTime: "2024-03-19 11:00:00",
            endTime: "2024-03-19 12:30:00"
        },
        {
            id: 7,
            name: "Vehicle Animation",
            type: "Animation",
            status: "In Progress",
            progress: 82,
            model: "Racing Car",
            startTime: "2024-03-20 09:30:00",
            endTime: null
        },
        {
            id: 8,
            name: "Product Display",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Smartphone",
            startTime: null,
            endTime: null
        },
        {
            id: 9,
            name: "Nature Scene",
            type: "Still",
            status: "Completed",
            progress: 100,
            model: "Mountain Landscape",
            startTime: "2024-03-19 13:15:00",
            endTime: "2024-03-19 15:45:00"
        },
        {
            id: 10,
            name: "Character Walk Cycle",
            type: "Animation",
            status: "In Progress",
            progress: 45,
            model: "Robot Character",
            startTime: "2024-03-20 11:00:00",
            endTime: null
        },
        {
            id: 11,
            name: "Jewelry Showcase",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Diamond Ring",
            startTime: null,
            endTime: null
        },
        {
            id: 12,
            name: "City Flythrough",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Future City",
            startTime: "2024-03-19 09:00:00",
            endTime: "2024-03-19 14:30:00"
        },
        {
            id: 13,
            name: "Interior Design",
            type: "Still",
            status: "In Progress",
            progress: 68,
            model: "Living Room",
            startTime: "2024-03-20 10:00:00",
            endTime: null
        },
        {
            id: 14,
            name: "Product Animation",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Gaming Console",
            startTime: "2024-03-19 14:00:00",
            endTime: "2024-03-19 16:00:00"
        },
        {
            id: 15,
            name: "Character Showcase",
            type: "360 View",
            status: "In Progress",
            progress: 92,
            model: "Superhero",
            startTime: "2024-03-20 07:30:00",
            endTime: null
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const nameInput = React.createRef();
    const typeInput = React.createRef();
    const resolutionInput = React.createRef();
    const threeDModelInput = React.createRef();

    const formRefs = [
        nameInput,
        typeInput,
        resolutionInput,
        threeDModelInput
    ];

    const inputList = [
        {
            type: 'info',
            action: formMode === 'create' ? 'Create' : 'Update',
            endpoint: 'renders',
            button_value: formMode === 'create' ? '+ RENDER' : 'UPDATE',
            allowButtonAction: false
        },
        {
            type: 'text',
            name: 'Name',
            ref: nameInput,
            value: selectedRender?.name || '',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'text',
            name: 'Resolution',
            ref: resolutionInput,
            value: selectedRender?.resolution || '',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'choice-listing',
            name: '3D Model',
            ref: threeDModelInput,
            values: selectedRender?.threeDModel|| '',
            onChange: null,
            validationInfo: null
        },
    ];

    const handleRenderSelect = (render) => {
        setSelectedRender(render);
    };

    const handleRenderAction = (action, render) => {
        switch (action) {
            case 'delete':
                handleDeleteRender(render.id);
                break;
            case 'edit':
                handleEditRender(render);
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    const handleCreateRender = () => {
        setFormMode('create');
        setIsFormVisible(true);
        setSelectedRender(null);
    };

    const handleEditRender = (render) => {
        setFormMode('edit');
        setIsFormVisible(true);
        setSelectedRender(render);
    };

    const handleDeleteRender = (renderId) => {
        setRenders(renders.filter(render => render.id !== renderId));
        if (selectedRender?.id === renderId) {
            setSelectedRender(null);
        }
        setMessage({ type: 'success', text: 'Render został usunięty' });
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            const newRender = {
                id: renders.length + 1,
                ...formData,
                lastModified: new Date().toISOString().split('T')[0],
                status: 'In Progress',
                progress: 0
            };
            setRenders([...renders, newRender]);
            setMessage({ type: 'success', text: 'Render został utworzony' });
        } else {
            setRenders(renders.map(render => 
                render.id === selectedRender.id 
                    ? { ...render, ...formData, lastModified: new Date().toISOString().split('T')[0] }
                    : render
            ));
            setMessage({ type: 'success', text: 'Render został zaktualizowany' });
        }
        setIsFormVisible(false);
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
        setSelectedRender(null);
    };

    const getRenderActions = (render) => {
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

    const mockRenders = [
        {
            id: 1,
            name: "Dragon Scene",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Dragon Model",
            startTime: "2024-03-01 10:00:00",
            endTime: "2024-03-01 12:30:00"
        },
        {
            id: 2,
            name: "Castle Exterior",
            type: "Still",
            status: "In Progress",
            progress: 65,
            model: "Medieval Castle",
            startTime: "2024-03-02 09:00:00",
            endTime: null
        },
        {
            id: 3,
            name: "Weapon Showcase",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Sci-fi Weapon",
            startTime: null,
            endTime: null
        },
        {
            id: 4,
            name: "Forest Flythrough",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Forest Scene",
            startTime: "2024-03-01 14:00:00",
            endTime: "2024-03-01 16:00:00"
        },
        {
            id: 5,
            name: "Robot Animation",
            type: "Animation",
            status: "In Progress",
            progress: 45,
            model: "Robot Character",
            startTime: "2024-03-02 11:00:00",
            endTime: null
        },
        {
            id: 6,
            name: "Spaceship Launch",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Space Ship",
            startTime: "2024-03-01 13:00:00",
            endTime: "2024-03-01 15:30:00"
        },
        {
            id: 7,
            name: "Temple Interior",
            type: "Still",
            status: "In Progress",
            progress: 78,
            model: "Ancient Temple",
            startTime: "2024-03-02 10:00:00",
            endTime: null
        },
        {
            id: 8,
            name: "Sword Display",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Fantasy Sword",
            startTime: null,
            endTime: null
        },
        {
            id: 9,
            name: "City Timelapse",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "City Block",
            startTime: "2024-03-01 09:00:00",
            endTime: "2024-03-01 11:30:00"
        },
        {
            id: 10,
            name: "Warrior Battle",
            type: "Animation",
            status: "In Progress",
            progress: 89,
            model: "Warrior Character",
            startTime: "2024-03-02 13:00:00",
            endTime: null
        },
        {
            id: 11,
            name: "Car Showcase",
            type: "360 View",
            status: "Queued",
            progress: 0,
            model: "Futuristic Car",
            startTime: null,
            endTime: null
        },
        {
            id: 12,
            name: "Mountain Vista",
            type: "Still",
            status: "Completed",
            progress: 100,
            model: "Mountain Range",
            startTime: "2024-03-01 15:00:00",
            endTime: "2024-03-01 16:30:00"
        },
        {
            id: 13,
            name: "Alien Movement",
            type: "Animation",
            status: "In Progress",
            progress: 34,
            model: "Alien Creature",
            startTime: "2024-03-02 14:00:00",
            endTime: null
        },
        {
            id: 14,
            name: "Staff Effects",
            type: "Animation",
            status: "Completed",
            progress: 100,
            model: "Magic Staff",
            startTime: "2024-03-01 16:00:00",
            endTime: "2024-03-01 18:30:00"
        },
        {
            id: 15,
            name: "Cave Exploration",
            type: "Animation",
            status: "In Progress",
            progress: 56,
            model: "Underground Cave",
            startTime: "2024-03-02 12:00:00",
            endTime: null
        }
    ];

    const filteredRenders = useMemo(() => {
        return renders.filter(render => 
            render.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            render.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            render.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            render.model.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [renders, searchQuery]);

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>3D Rendering</h2>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Szukaj renderów..."
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
                        onClick={handleCreateRender}
                    >
                        <i className="fas fa-plus"></i>
                        Create Render
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
                            refList={formRefs}
                            action={handleFormSubmit}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={filteredRenders}
                selectedItem={selectedRender}
                onItemSelect={handleRenderSelect}
                onItemAction={handleRenderAction}
                getItemActions={getRenderActions}
                renderItem={(render) => (
                    <div className="list-row">
                        <div className="item-info">
                            <div className="item-name">{render.name}</div>
                            <div className="item-type">{render.type}</div>
                            <div className={`item-status ${render.status.toLowerCase().replace(' ', '-')}`}>
                                {render.status}
                            </div>
                            <div className="item-progress">
                                <div className="progress-bar">
                                    <div 
                                        className="progress-fill"
                                        style={{ width: `${render.progress}%` }}
                                    />
                                </div>
                                <span>{render.progress}%</span>
                            </div>
                        </div>
                        <div className="item-details">
                            <div>Rozdzielczość: {render.resolution}</div>
                            <div>Ostatnia modyfikacja: {render.lastModified}</div>
                        </div>
                    </div>
                )}
                renderDetails={(render) => (
                    <div className="details-panel">
                        <h3>Szczegóły renderu</h3>
                        <div className="detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{render.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Nazwa:</span>
                            <span className="detail-value">{render.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Typ:</span>
                            <span className="detail-value">{render.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Rozdzielczość:</span>
                            <span className="detail-value">{render.resolution}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{render.status}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Postęp:</span>
                            <span className="detail-value">{render.progress}%</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Ostatnia modyfikacja:</span>
                            <span className="detail-value">{render.lastModified}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default RendersDashboard;

