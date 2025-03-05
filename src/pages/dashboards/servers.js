import React, { useState, useRef, useMemo } from 'react';
import { ListGenerator } from '../../components/forms/listGenerator';
import FormGenerator from '../../components/forms/formGenerator';

const ServersDashboard = () => {
    const [selectedServer, setSelectedServer] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [servers, setServers] = useState([
        {
            id: 1,
            name: "Render Node 1",
            type: "Render Node",
            status: "Active",
            progress: 100,
            ip: "192.168.1.101",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 2,
            name: "AI Training Node 1",
            type: "AI Training Node",
            status: "In Progress",
            progress: 75,
            ip: "192.168.1.102",
            lastActive: "2024-03-20 11:29:00"
        },
        {
            id: 3,
            name: "Storage Server 1",
            type: "Storage Server",
            status: "Active",
            progress: 100,
            ip: "192.168.1.103",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 4,
            name: "Render Node 2",
            type: "Render Node",
            status: "Inactive",
            progress: 0,
            ip: "192.168.1.104",
            lastActive: "2024-03-20 10:15:00"
        },
        {
            id: 5,
            name: "AI Training Node 2",
            type: "AI Training Node",
            status: "Active",
            progress: 100,
            ip: "192.168.1.105",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 6,
            name: "Storage Server 2",
            type: "Storage Server",
            status: "Active",
            progress: 100,
            ip: "192.168.1.106",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 7,
            name: "Render Node 3",
            type: "Render Node",
            status: "In Progress",
            progress: 82,
            ip: "192.168.1.107",
            lastActive: "2024-03-20 11:29:00"
        },
        {
            id: 8,
            name: "AI Training Node 3",
            type: "AI Training Node",
            status: "Queued",
            progress: 0,
            ip: "192.168.1.108",
            lastActive: "2024-03-20 11:00:00"
        },
        {
            id: 9,
            name: "Storage Server 3",
            type: "Storage Server",
            status: "Active",
            progress: 100,
            ip: "192.168.1.109",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 10,
            name: "Render Node 4",
            type: "Render Node",
            status: "In Progress",
            progress: 45,
            ip: "192.168.1.110",
            lastActive: "2024-03-20 11:29:00"
        },
        {
            id: 11,
            name: "AI Training Node 4",
            type: "AI Training Node",
            status: "Active",
            progress: 100,
            ip: "192.168.1.111",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 12,
            name: "Storage Server 4",
            type: "Storage Server",
            status: "Inactive",
            progress: 0,
            ip: "192.168.1.112",
            lastActive: "2024-03-20 10:45:00"
        },
        {
            id: 13,
            name: "Render Node 5",
            type: "Render Node",
            status: "Active",
            progress: 100,
            ip: "192.168.1.113",
            lastActive: "2024-03-20 11:30:00"
        },
        {
            id: 14,
            name: "AI Training Node 5",
            type: "AI Training Node",
            status: "In Progress",
            progress: 68,
            ip: "192.168.1.114",
            lastActive: "2024-03-20 11:29:00"
        },
        {
            id: 15,
            name: "Storage Server 5",
            type: "Storage Server",
            status: "Active",
            progress: 100,
            ip: "192.168.1.115",
            lastActive: "2024-03-20 11:30:00"
        }
    ]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const nameInput = React.createRef();
    const typeInput = React.createRef();
    const ipInput = React.createRef();
    const statusInput = React.createRef();

    const formRefs = [
        nameInput,
        typeInput,
        ipInput,
        statusInput
    ];

    const inputList = [
        {
            type: 'info',
            action: formMode === 'create' ? 'Create' : 'Update',
            endpoint: 'servers',
            button_value: formMode === 'create' ? '+ SERVER' : 'UPDATE'
        },
        {
            type: 'text',
            name: 'NAME',
            ref: nameInput,
            value: selectedServer?.name || '',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'select',
            name: 'TYPE',
            ref: typeInput,
            options: [
                { value: 'Render', label: 'Render' },
                { value: 'AI', label: 'AI' },
                { value: 'Storage', label: 'Storage' }
            ],
            value: selectedServer?.type || 'Render',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'text',
            name: 'IP',
            ref: ipInput,
            value: selectedServer?.ip || '',
            onChange: null,
            validationInfo: null
        },
        {
            type: 'select',
            name: 'STATUS',
            ref: statusInput,
            options: [
                { value: 'Online', label: 'Online' },
                { value: 'Offline', label: 'Offline' },
                { value: 'Maintenance', label: 'Maintenance' }
            ],
            value: selectedServer?.status || 'Offline',
            onChange: null,
            validationInfo: null
        }
    ];

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

    const handleFormAction = (refs) => {
        const formData = {};
        refs.forEach((ref, index) => {
            formData[inputList[index].name] = ref.current.value;
        });
        handleFormSubmit(formData);
    };

    const filteredServers = useMemo(() => {
        return servers.filter(server => 
            server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            server.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            server.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            server.ip.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [servers, searchQuery]);

    return (
        <div className="list-container">
            <div className="dashboard-header">
                <h2>GPU Instances</h2>
                <div className="dashboard-controls">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Szukaj serwerów..."
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
                        onClick={handleCreateServer}
                    >
                        <i className="fas fa-plus"></i>
                        Add Server
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
                            action={handleFormAction}
                        />
                    </div>
                </div>
            )}

            <ListGenerator
                data={filteredServers}
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

