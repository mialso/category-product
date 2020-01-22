import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/index.dev';

import './style.css';

const title = 'ract updated render';
const store = configureStore({});

export function render() {
    ReactDOM.render(
        <Provider store={store}>
            <div className="Title">
                {title}
                <div>yooo</div>
            </div>
        </Provider>,
        document.getElementById('app'),
    );
    module.hot.accept();
}
