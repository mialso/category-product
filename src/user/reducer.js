import { Just, Nothing } from 'type/Maybe';
import { NOT_ASKED, ASKED, READY } from 'app/remote/constants';
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
    dataStatus: NOT_ASKED,
};

export function userReducer(state = initState, action = {}) {
    switch (action.type) {
        case USER_SIGNUP: {
            return state;
        }
        case READ_USER: {
            return {
                ...state,
                dataStatus: ASKED,
            };
        }
        case SET_USER: {
            return {
                currentUser: Just(action.payload),
                dataStatus: READY,
            };
        }
        default: return state;
    }
}
