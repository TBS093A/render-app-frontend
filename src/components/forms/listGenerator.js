import React, { useState } from 'react';

/**
 * Generic List Generator
 * 
 * @param {Array} data - Array of items to display.
 * @param {ReactElement|Function} create_component - Shown when user clicks "Create +".
 * @param {ReactElement|Function} update_component - Shown when user clicks "Update".
 * @param {Function} delete_action - Called when user clicks "Delete".
 */
export const ListGenerator = ({
  data = [],
  create_component = null,
  update_component = null,
  delete_action = null,
}) => {

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  var buttons = 0

  if(create_component !== null) {
    buttons++;
  }
  if(update_component !== null) {
    buttons++;
  }
  if(delete_action !== null) {
    buttons++;
  }

  const columns_count = 100 / (columns.length + buttons);

  // Controls whether the "create" form is visible
  const [createVisible, setCreateVisible] = useState(false);

  // Track which item is being updated (store an ID or index, or null if none)
  const [itemBeingUpdated, setItemBeingUpdated] = useState(null);

  // Toggle the "create" form
  const handleToggleCreate = () => {
    setCreateVisible((prev) => !prev);
    // If user opens the create form, you might also want to close any update forms
    setItemBeingUpdated(null);
  };

  // Toggle update form for a specific item
  const handleToggleUpdate = (itemId) => {
    setItemBeingUpdated((prev) => (prev === itemId ? null : itemId));
    // Also close create if it's open
    setCreateVisible(false);
  };

  // Handle delete
  const handleDelete = (item) => {
    if (typeof delete_action === 'function') {
      delete_action(item);
    }
  };

  // Helper to render a component if it’s a function or a React element
  const renderComponent = (component, props = {}) => {
    // If it's a function, call it
    if (typeof component === 'function') {
      return component(props);
    }
    // If it's a React element, clone it to pass in new props (optional)
    return React.cloneElement(component, props);
  };

  return (
    <div className="list-generator-container">

      {create_component && (
        <div className="create-section">
          <button onClick={handleToggleCreate}>
            {createVisible ? 'Close' : 'Create +'}
          </button>
          {createVisible && (
            <div className="create-form">
              {renderComponent(create_component)}
            </div>
          )}
        </div>
      )}

      <div className="items-columns">
        {
            columns.map( 
                (column) => (
                
                    <div 
                      className="item-column-row" 
                      style={{
                        "width": columns_count + "%",
                      }}
                    >
                        {column.toUpperCase()}
                    </div>

                )
            )
        } 
      </div>

      <div className="items-list">

        {data.map((item) => (

          <div key={item.id} className="item-row">

            {
                Object.values(item).map((value) => (
                        <div 
                          className="item-info"
                          style={{
                            "width": columns_count + "%",
                          }}
                        >
                            {value}
                        </div>
                    )  
                )
            }

            {/* UPDATE BUTTON & FORM */}
            {update_component && (
              <>
                <button
                  className="update-button" 
                  onClick={() => handleToggleUpdate(item.id)}
                >
                  {itemBeingUpdated === item.id ? 'Close' : 'Update'}
                </button>
                {itemBeingUpdated === item.id && (
                  <div className="update-form">
                    {renderComponent(update_component, { item })}
                  </div>
                )}
              </>
            )}

            {/* DELETE BUTTON */}
            {delete_action && (
              <button
                className="delete-button"
                onClick={() => handleDelete(item)}
                style={{ marginLeft: '8px' }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
