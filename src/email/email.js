import { compose } from './util';

import './style.css';

// Email model is designed according to RFC 2822
// https://tools.ietf.org/html/rfc2822#section-3.4
export const Email = {
    localPart: '',
    domain: '',
};

export function createEmail(emailString) {
    const id = emailString;
    const [ localPart, domain ] = emailString.split('@');
    return {
        id,
        localPart,
        domain,
    };
}

export function isValid(emailString) {
    const [ localPart, domain ] = emailString.split('@');
    return !!(localPart && domain);
}
export const CREATE_EMAIL = 'CREATE_EMAIL';
export const REMOVE_EMAIL = 'REMOVE_EMAIL';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const DELETE_EMAIL = 'DELETE_EMAIL';

const initialState = {
    emailIds: [],
    emailById: {},
    inputValue: '',
};

export function addEmail(state, emailString) {
    if (!isValid(emailString)) {
        return state;
    }
    const newEmail = createEmail(emailString);
    return {
        emailIds: state.emailIds.concat(newEmail.id),
        emailById: {
            [newEmail.id]: newEmail,
            ...state.emailById,
        },
    };
}

export const emailReducer = (getState) => (message) => {
    const state = getState();
    switch (message.type) {
        case CREATE_EMAIL: return addEmail(state, message.payload);
        default: return state;
    }
};

export const EmailEditor = `
    <div class="EmailEditor">
        <div class="EmailEditor-Title">Share Board name with others</div>
        <div class="EmailEditor-Content">
            <div class="EmailEditor-List"></div>
            <input class="EmailEditor-Input" type="email" placeholder="add more people..."></input>
        </div>
        <div class="EmailEditor-Actions">
            <button class="EmailEditor-Button--AddEmail">Add email</button>
            <button class="EmailEditor-Button--GetCount">Get emails count</button>
        </div>
    </div>
`;

export function getItem(id) {
    return `<span class="EmailEditor-Item">${id}</span>`;
}

let parentElement = null;

export const handleRender = (getState, setState) => (nextState) => {
    debugger;
    const state = getState();
    if (state === nextState) {
        return;
    }
    const emailListContainer = parentElement.querySelector('.EmailEditor-List');
    const emailInput = parentElement.querySelector('.EmailEditor-Input');
    if (!emailListContainer) {
        console.error('Unable to get .EmailEditor-List');
        return;
    }
    setState(nextState);
    emailListContainer.innerHTML = nextState.emailIds.map(getItem).join('');
    emailInput.value = '';
};

let currentState = initialState;

const getState = () => currentState;
const setState = (nextState) => {
    currentState = nextState;
};

export function getRandomString() {
    return Math.random().toString().substring(2);
}

export const handleInputEmail = compose(
    handleRender(getState, setState),
    emailReducer(getState),
    (event) => ({ type: CREATE_EMAIL, payload: event.target.value }),
);

export const handleAddClick = compose(
    handleRender(getState, setState),
    emailReducer(getState),
    () => ({ type: CREATE_EMAIL, payload: `${getRandomString()}@email` }),
);

export const handleCountClick = () => {};

export function addEmailEditor(element) {
    parentElement = element;
    const emailEditorFragment = document.createRange().createContextualFragment(EmailEditor);
    const emailInputElement = emailEditorFragment.querySelector('.EmailEditor-Input');
    const emailAddButton = emailEditorFragment.querySelector('.EmailEditor-Button--AddEmail');
    const emailCountButton = emailEditorFragment.querySelector('.EmailEditor-Button--GetCount');
    emailInputElement.onchange = handleInputEmail;
    emailAddButton.onclick = handleAddClick;
    emailCountButton.onclick = handleCountClick;
    parentElement.appendChild(emailEditorFragment);
}
