import React from 'react';

import './greeting.css';

export const GreetingPicker = () => (
    <div className="GreetingPicker">
        <label htmlFor="greeting">With greeting</label>
        <input name="greeting" type="checkbox" />
    </div>
);
