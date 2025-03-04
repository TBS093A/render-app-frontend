import React, { useState } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';

const ServersDashboard = () => {
    const [selectedServer, setSelectedServer] = useState(null);
    const [servers, setServers] = useState([
        {
            id: 1,
            name: 'Server A',
            type: 'Render',
            status: 'Online',
            lastModified: '2024-03-20',
            ip: '192.168.1.100'
        },
        {
            id: 2,
            name: 'Server B',
            type: 'AI',
            status: 'Offline',
            lastModified: '2024-03-19',
            ip: '192.168.1.101'
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleServerSelect = (server) => {
        setSelectedServer(server);
    };

    const handleServerAction = (action, server) => {
        switch (action) {
            case 'delete':
                handleDeleteServer(server.id);
                break;
            case 'edit':
                handleEditServer(server);
                break;
            default:
                console.log('Unknown action:', action);
        }
    };

    const handleCreateServer = () => {
        setFormMode('create');
        setIsFormVisible(true);
        setSelectedServer(null);
    };

    const handleEditServer = (server) => {
        setFormMode('edit');
        setIsFormVisible(true);
        setSelectedServer(server);
    };

    const handleDeleteServer = (serverId) => {
        setServers(servers.filter(server => server.id !== serverId));
        if (selectedServer?.id === serverId) {
            setSelectedServer(null);
        }
        setMessage({ type: 'success', text: 'Serwer został usunięty' });
    };

    const handleFormSubmit = (formData) => {
        if (formMode === 'create') {
            const newServer = {
                id: servers.length + 1,
                ...formData,
                lastModified: new Date().toISOString().split('T')[0],
                status: 'Offline'
            };
            setServers([...servers, newServer]);
            setMessage({ type: 'success', text: 'Serwer został utworzony' });
        } else {
            setServers(servers.map(server => 
                server.id === selectedServer.id 
                    ? { ...server, ...formData, lastModified: new Date().toISOString().split('T')[0] }
                    : server
            ));
            setMessage({ type: 'success', text: 'Serwer został zaktualizowany' });
        }
        setIsFormVisible(false);
    };

    const handleFormCancel = () => {
        setIsFormVisible(false);
        setSelectedServer(null);
    };

    const getServerActions = (server) => {
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
            label: 'Nazwa serwera',
            type: 'text',
            required: true,
            value: selectedServer?.name || ''
        },
        {
            name: 'type',
            label: 'Typ serwera',
            type: 'select',
            required: true,
            options: [
                { value: 'Render', label: 'Render' },
                { value: 'AI', label: 'AI' },
                { value: 'Storage', label: 'Storage' }
            ],
            value: selectedServer?.type || 'Render'
        },
        {
            name: 'ip',
            label: 'Adres IP',
            type: 'text',
            required: true,
            value: selectedServer?.ip || ''
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            required: true,
            options: [
                { value: 'Online', label: 'Online' },
                { value: 'Offline', label: 'Offline' },
                { value: 'Maintenance', label: 'Maintenance' }
            ],
            value: selectedServer?.status || 'Offline'
        }
    ];

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>Servers</h2>
                <button 
                    className="create-button"
                    onClick={handleCreateServer}
                >
                    <i className="fas fa-plus"></i>
                    Server
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
                            title={formMode === 'create' ? 'Utwórz nowy serwer' : 'Edytuj serwer'}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={servers}
                selectedItem={selectedServer}
                onItemSelect={handleServerSelect}
                onItemAction={handleServerAction}
                getItemActions={getServerActions}
                renderItem={(server) => (
                    <div className="list-row">
                        <div className="item-info">
                            <div className="item-name">{server.name}</div>
                            <div className="item-type">{server.type}</div>
                            <div className={`item-status ${server.status.toLowerCase()}`}>
                                {server.status}
                            </div>
                        </div>
                        <div className="item-details">
                            <div>IP: {server.ip}</div>
                            <div>Ostatnia modyfikacja: {server.lastModified}</div>
                        </div>
                    </div>
                )}
                renderDetails={(server) => (
                    <div className="details-panel">
                        <h3>Szczegóły serwera</h3>
                        <div className="detail-row">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{server.id}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Nazwa:</span>
                            <span className="detail-value">{server.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Typ:</span>
                            <span className="detail-value">{server.type}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">IP:</span>
                            <span className="detail-value">{server.ip}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{server.status}</span>
                        </div>
                        <div className="detail-row">
                            <span className="detail-label">Ostatnia modyfikacja:</span>
                            <span className="detail-value">{server.lastModified}</span>
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default ServersDashboard;

