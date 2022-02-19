import React from 'react';

import './title.css';

export const TitlePicker = () => (
    <div className="TitlePicker">
        <label htmlFor="title-text">Title</label>
        <input name="title-text" type="text" />
    </div>
);

