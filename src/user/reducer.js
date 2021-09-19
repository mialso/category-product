import { Just, Nothing } from 'type/Maybe';
import {
    USER_SIGNUP, SET_USER, SET_GUEST_USER,
} from './action';
import { GUEST } from './constants';

/*
const User = {
    name: '',
    role: '',
};
*/

const GUEST_USER = { name: '', role: GUEST };

const initState = {
    currentUser: Nothing(),
};

export function userReducer(state = initState, action) {
    switch (action.type) {
        case USER_SIGNUP: {
            return state;
        }
        case SET_USER: {
            return {
                ...state,
                currentUser: Just(action.payload),
            };
        }
        case SET_GUEST_USER: return ({ ...state, currentUser: Just(GUEST_USER) });
        default: return state;
    }
}
