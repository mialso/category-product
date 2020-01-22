import { USER_SIGNUP } from './action';

const initState = {
    name: '',
    role: '',
};

export function userReducer(state = initState, action = {}) {
    switch (action.type) {
        case USER_SIGNUP: {
            return state;
        }
        default: return state;
    }
}
