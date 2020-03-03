import { Just, Nothing } from 'type/Maybe';
import {
    USER_SIGNUP, READ_USER, SET_USER,
} from './action';

/*
const User = {
    name: '',
    role: '',
};
*/

const initState = {
    currentUser: Nothing(),
};

export function userReducer(state = initState, action = {}) {
    switch (action.type) {
        case USER_SIGNUP: {
            return state;
        }
        case SET_USER: {
            return {
                currentUser: Just(action.payload),
            };
        }
        default: return state;
    }
}
