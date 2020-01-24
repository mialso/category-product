import { render } from './render';
import configureStore from '../store/index.dev';

const store = configureStore({});

const { addEmailEditor } = window.EmailEditor;

const EMAIL_INPUT_ID = 'email_input';
window.onload = () => {
    render(store);
    const emailInputContainer = document.getElementById(EMAIL_INPUT_ID);
    if (!emailInputContainer) {
        console.error(`Unable to find element by id: ${EMAIL_INPUT_ID}`);
        return;
    }
    addEmailEditor(emailInputContainer);
};
