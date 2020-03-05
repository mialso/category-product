import { SUCCESS, FAIL } from 'app/remote/api';
import {
    REQUIRE_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser, setGuestUser,
} from './action';
import { currentUser } from './selector';

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
        // (false, currentUser, REQUIRE_USER)
        case REQUIRE_USER: {
            const { user } = currentUser(getState());
            if (!user) {
                const token = localStorage.getItem('token');
                if (token) {
                    // REQUIRE_USER causes READ_USER_API if (!user && token)
                    dispatch(readUserApi(token));
                } else {
                    // REQUIRE_USER causes SET_USER if (!user && !token)
                    dispatch(setGuestUser());
                }
            }
            break;
        }
        // ({ true, GUEST }, { currentUser, currentUserRole }, USER_LOGIN)
        case USER_LOGIN: {
            // TODO: if operation is not in progress???
            // USER_LOGIN causes USER_LOGIN_API
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
            dispatch(setGuestUser());
            break;
        }
        default: break;
    }
}
