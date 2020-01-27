import { render } from './render';
import configureStore from '../store/index.dev';

const store = configureStore({});

// const { addEmailEditor } = window.EmailEditor;

// const getEmailInputId = (num) => `email_input_${num}`;

/*
function initEmailEditor(dispatch, num) {
    const emailInputContainer = document.getElementById(getEmailInputId(num));
    const { subscribe, getEmails, setEmails } = addEmailEditor(emailInputContainer);

    const unsubscribeChange = subscribe((state) => dispatch({ type: `[${num}]: EMAIL_EDITOR_CHANGE`, payload: state }));
    subscribe(() => dispatch({ type: `[${num}]: EMAIL_EDITOR_EMAIL_UPDATE`, payload: getEmails() }));
    setEmails([ 'email@one', '234' ]);

    window.setTimeout(() => unsubscribeChange());
}
*/

window.onload = () => {
    render(store);

/*
    initEmailEditor(store.dispatch, 1);
    initEmailEditor(store.dispatch, 2);
    initEmailEditor(store.dispatch, 3);
*/
};
