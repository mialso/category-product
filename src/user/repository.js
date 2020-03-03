import { SUCCESS, FAIL } from 'app/remote/api';
import {
    REQUIRE_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser,
} from './action';
import { currentUser } from './selector';
import { GUEST } from './constants';

const TIMEOUT = 0;

export function withToken(dispatch, action) {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(action(token));
    } else {
        dispatch({ type: `ERROR_${action().type}`, error: 'Remote data error: No token' });
    }
}

export function userData({ dispatch, getState }, message) {
    switch (message.type) {
        case REQUIRE_USER: {
            const { user } = currentUser(getState());
            if (!user) {
                const token = localStorage.getItem('token');
                if (token) {
                    dispatch(readUserApi(token));
                } else {
                    dispatch(setUser({ name: '', role: GUEST }));
                }
            }
            break;
        }
        case USER_LOGIN: {
            dispatch(userLoginApi(message.payload));
            break;
        }
        case USER_LOGIN_API + SUCCESS: {
            localStorage.setItem('token', message.payload.token);
            setTimeout(() => dispatch(setUser(message.payload.user)), TIMEOUT);
            break;
        }
        case READ_USER_API + SUCCESS: {
            setTimeout(() => dispatch(setUser(message.payload)), TIMEOUT);
            break;
        }
        case READ_USER_API + FAIL:
        case USER_LOGOUT: {
            localStorage.removeItem('token');
            dispatch(setUser({ name: '', role: GUEST }));
            break;
        }
        default: break;
    }
}
