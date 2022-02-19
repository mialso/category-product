import React from 'react';

import './preview.css';

export const Preview = () => (
    <div>Preview</div>
);

export const PreviewConfig = () => (
    <div className="PreviewConfig">
        <div>Preview Config</div>
        <label htmlFor="format">Format</label>
        <select name="format" defaultValue="">
            <option value="" disabled>...choose format</option>
            <option value="A4">A4</option>
        </select>
    </div>
);

export const OfferPreview = () => (
    <div className="OfferPreview">
        <PreviewConfig />
        <Preview />
    </div>
);
