import React from 'react';

export const Case = ({ match, map }) => {
    const Component = map[match] || map.default;
    if (!Component) {
        return null;
    }
    return (
        <Component />
    );
};
