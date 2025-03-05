import React, { useState, useMemo } from 'react';

/**
 * Generic List Generator Component
 * 
 * @param {Array} data - Array of items to display
 * @param {string} title - Title of the list
 * @param {ReactElement|Function} onCreate - Component shown when user clicks "Create +"
 * @param {ReactElement|Function} onUpdate - Component shown when user clicks "Update"
 * @param {Function} onDelete - Function called when user clicks "Delete"
 * @param {Function} onRefresh - Optional function to refresh the list
 */
export const ListGenerator = ({
  data = [],
  title,
  onCreate = null,
  onUpdate = null,
  onDelete = null,
  onRefresh = null
}) => {
  const columns = data.length > 0 
    ? Object.keys(data[0]).filter(key => !key.toLowerCase().includes('id')) 
    : [];
  const [createVisible, setCreateVisible] = useState(false);
  const [itemBeingUpdated, setItemBeingUpdated] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const pageOptions = [5, 10, 15, 25, 50];
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Oblicz aktualnie wyświetlane elementy
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // Obsługa zmiany strony
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedItem(null);
  };

  // Obsługa zmiany liczby elementów na stronie
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedItem(null);
  };

  // Toggle the "create" form
  const handleToggleCreate = () => {
    setCreateVisible((prev) => !prev);
    setItemBeingUpdated(null);
    setSelectedItem(null);
  };

  // Toggle update form for a specific item
  const handleToggleUpdate = (itemId) => {
    setItemBeingUpdated((prev) => (prev === itemId ? null : itemId));
    setCreateVisible(false);
  };

  // Handle delete with confirmation
  const handleDelete = async (item) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setIsLoading(true);
      try {
        if (typeof onDelete === 'function') {
          await onDelete(item);
          if (onRefresh) {
            await onRefresh();
          }
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Failed to delete item. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle refresh
  const handleRefresh = async () => {
    if (onRefresh) {
      setIsLoading(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Error refreshing list:', error);
        alert('Failed to refresh list. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle item selection
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Helper to render a component if it's a function or a React element
  const renderComponent = (component, props = {}) => {
    if (typeof component === 'function') {
      return component(props);
    }
    return React.cloneElement(component, props);
  };

  return (
    <div className="list-generator-container">
      <div className="table-header">
        {title && <h2>{title}</h2>}
        <div className="header-actions">
          {onRefresh && (
            <button 
              className="refresh-button"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          )}
          {onCreate && (
            <button 
              className="create-button"
              onClick={handleToggleCreate}
            >
              {createVisible ? 'Close' : `+ ${title || 'Item'}`}
            </button>
          )}
        </div>
      </div>

      {createVisible && onCreate && (
        <div className="create-form">
          {renderComponent(onCreate)}
        </div>
      )}

      <div className="items-columns">
        {columns.map((column) => (
          <div key={column} className="item-column-row">
            {column.toUpperCase()}
          </div>
        ))}
        {(onUpdate || onDelete) && (
          <div className="item-column-row">Actions</div>
        )}
      </div>

      <div className="items-list">
        {data.length === 0 ? (
          <div className="no-data">
            No items found. {onCreate && `Click '+ ${title || 'Item'}' to add new items.`}
          </div>
        ) : (
          currentItems.map((item) => (
            <div 
              key={item.id} 
              className={`item-row ${selectedItem?.id === item.id ? 'selected' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {Object.entries(item)
                .filter(([key]) => !key.toLowerCase().includes('id'))
                .map(([key, value], index) => (
                  <div key={index} className="item-info">
                    {key.toLowerCase() === 'progress' ? (
                      value === 100 ? (
                        <span className="completed-text">Completed</span>
                      ) : (
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${value}%` }}
                          />
                          <span className="progress-text">{value}%</span>
                        </div>
                      )
                    ) : key.toLowerCase() === 'status' ? (
                      <span className={`status-text ${value.toLowerCase().replace(/\s+/g, '-')}`}>
                        {value}
                      </span>
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                ))}
              {(onUpdate || onDelete) && (
                <div className="action-buttons">
                  {onUpdate && (
                    <button
                      className="update-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleUpdate(item.id);
                      }}
                    >
                      {itemBeingUpdated === item.id ? 'Close' : 'Update'}
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="delete-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item);
                      }}
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  )}
                </div>
              )}
              {itemBeingUpdated === item.id && onUpdate && (
                <div className="update-form">
                  {renderComponent(onUpdate, { item })}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {data.length > 0 && (
        <div className="pagination-controls">
          <div className="items-per-page">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {pageOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="pagination-buttons">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &lt;&lt;
            </button>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              &lt;
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              &gt;
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      )}

      <div className="element-details">
        {selectedItem ? (
          <div className="details-content">
            <h3>Details</h3>
            {Object.entries(selectedItem)
              .filter(([key]) => !key.toLowerCase().includes('id'))
              .map(([key, value]) => (
                <div key={key} className="detail-row">
                  <span className="detail-label">{key}:</span>
                  <span className="detail-value">
                    {key.toLowerCase() === 'progress' ? (
                      value === 100 ? (
                        <span className="completed-text">Completed</span>
                      ) : (
                        <span>{value}%</span>
                      )
                    ) : (
                      value
                    )}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="no-selection">
            Select an item to view details
          </div>
        )}
      </div>
    </div>
  );
};
