import React, { useState } from 'react';

import { ListGenerator } from '../../components/forms/listGenerator';

const ModelsDashboard = () => {

    const [items, setItems] = useState([
        { id: 0, name: 'orc.blend' },
        { id: 1, name: 'palladin.blend' },
    ]);

    return (
        <>
            <div className="list-container">
                <ListGenerator
                    data={items}
                />
                <div className="element-details">

                </div>
            </div>
        </>
    )
}

export default ModelsDashboard