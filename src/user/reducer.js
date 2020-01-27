import {
    USER_SIGNUP, READ_USER, SET_USER, USER_LOGIN_API,
    READ_USER_API, USER_LOGOUT,
} from './action';
import {
    NOT_ASKED, ASKED, LOADING, READY, ERROR,
} from './constants';

/*
const User = {
    name: '',
    role: '',
};
*/

const initState = {
    currentUser: {},
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
                currentUser: action.payload,
                dataStatus: READY,
            };
        }
        case `${READ_USER_API}_START`:
        case `${USER_LOGIN_API}_START`: {
            return {
                ...state,
                dataStatus: LOADING,
            };
        }
        case `${READ_USER_API}_FAIL`:
        case `${USER_LOGIN_API}_FAIL`: {
            return {
                ...state,
                dataStatus: ERROR,
            };
        }
        case `${READ_USER_API}_SUCCESS`:
        case `${USER_LOGIN_API}_SUCCESS`: {
            return {
                ...state,
                dataStatus: READY,
            };
        }
        default: return state;
    }
}
