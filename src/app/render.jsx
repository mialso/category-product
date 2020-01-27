import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// import ConnectedUserLogin from '../user/login';
import ConnectedContent from './content';

import './style.css';

const title = 'ract updated render';

export function render(store) {
    ReactDOM.render(
        <Provider store={store}>
            <div className="Title">
                {title}
                <div>yooo</div>
            </div>
            <ConnectedContent />
        </Provider>,
        document.getElementById('app'),
    );
    module.hot.accept();
}
