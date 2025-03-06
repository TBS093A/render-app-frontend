import { useState } from 'react';

export const useDashboardList = (initialItems = []) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState(initialItems);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Implementacja wyszukiwania w zależności od typu elementów
        const filteredItems = initialItems.filter(item => 
            Object.values(item).some(value => 
                String(value).toLowerCase().includes(query.toLowerCase())
            )
        );
        setItems(filteredItems);
    };

    const handleItemSelect = (item) => {
        setSelectedItem(item);
    };

    const handleFormToggle = (mode = 'create', item = null) => {
        setFormMode(mode);
        setSelectedItem(item);
        setIsFormVisible(!isFormVisible);
    };

    const handleMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 3000);
    };

    return {
        selectedItem,
        searchQuery,
        items,
        isFormVisible,
        formMode,
        message,
        handleSearch,
        handleItemSelect,
        handleFormToggle,
        handleMessage,
        setItems
    };
}; 