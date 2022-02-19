import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './app';

const getContainerElement = () => document.getElementById('app');

export function render(store) {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        getContainerElement(),
    );
    return () => {
        ReactDOM.unmountComponentAtNode(getContainerElement());
    };
}
