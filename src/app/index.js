import { render } from '../render/react';
import configureStore from '../store/index.dev';

const store = configureStore({});

window.onload = () => {
    render(store);
};
