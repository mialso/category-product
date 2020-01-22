import { render } from './render';
import configureStore from '../store/index.dev';

const store = configureStore({});

window.onload = () => {
    render(store);
};
