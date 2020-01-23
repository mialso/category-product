import './style.css';

// Email model is designed according to RFC 2822
// https://tools.ietf.org/html/rfc2822#section-3.4
export const Email = {
    localPart: '',
    domain: '',
};

export const CREATE_EMAIL = 'CREATE_EMAIL';
export const REMOVE_EMAIL = 'REMOVE_EMAIL';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const DELETE_EMAIL = 'DELETE_EMAIL';

export const emailReducer = (state, message) => {
    switch (message.type) {
        case CREATE_EMAIL: {
            return state;
        }
        default: return state;
    }
};

export const EmailInput = `
    <div class="EmailInput">
    </div>
`;

export function createEmailInput(parentElement) {
    const emailInputFragment = document.createRange().createContextualFragment(EmailInput);
    parentElement.appendChild(emailInputFragment);
}
