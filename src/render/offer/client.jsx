import React from 'react';

import './client.css';

export const ClientPicker = () => (
    <div className="ClientPicker">
        <label htmlFor="client-name">Name</label>
        <input name="client-name" type="text" />
    </div>
);
