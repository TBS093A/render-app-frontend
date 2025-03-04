import React, { useState } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';

const RendersDashboard = () => {
    const [selectedRender, setSelectedRender] = useState(null);
    const [renders, setRenders] = useState([
        {
            id: 1,
            name: 'Render A',
            type: '3D',
            status: 'Completed',
            lastModified: '2024-03-20',
            resolution: '1920x1080',
            progress: 100
        },
        {
            id: 2,
            name: 'Render B',
            type: '2D',
            status: 'In Progress',
            lastModified: '2024-03-19',
            resolution: '3840x2160',
            progress: 45
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

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

    const formFields = [
        {
            name: 'name',
            label: 'Nazwa renderu',
            type: 'text',
            required: true,
            value: selectedRender?.name || ''
        },
        {
            name: 'type',
            label: 'Typ renderu',
            type: 'select',
            required: true,
            options: [
                { value: '3D', label: '3D' },
                { value: '2D', label: '2D' }
            ],
            value: selectedRender?.type || '3D'
        },
        {
            name: 'resolution',
            label: 'Rozdzielczość',
            type: 'select',
            required: true,
            options: [
                { value: '1920x1080', label: 'Full HD (1920x1080)' },
                { value: '3840x2160', label: '4K (3840x2160)' },
                { value: '7680x4320', label: '8K (7680x4320)' }
            ],
            value: selectedRender?.resolution || '1920x1080'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { value: 'In Progress', label: 'W trakcie' },
                { value: 'Completed', label: 'Zakończony' },
                { value: 'Failed', label: 'Nieudany' }
            ],
            value: selectedRender?.status || 'In Progress'
        },
        {
            name: 'progress',
            label: 'Postęp',
            type: 'number',
            required: true,
            min: 0,
            max: 100,
            value: selectedRender?.progress || 0
        }
    ];

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>Rendered Materials</h2>
                <button 
                    className="create-button"
                    onClick={handleCreateRender}
                >
                    <i className="fas fa-plus"></i>
                    Render
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
                            title={formMode === 'create' ? 'Utwórz nowy render' : 'Edytuj render'}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={renders}
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

