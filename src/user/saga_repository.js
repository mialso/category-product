import { put, take, select } from 'redux-saga/effects';
import { SUCCESS, FAIL } from 'app/remote/api';
import {
    REQUIRE_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser, setGuestUser,
} from './action';
import { currentUser, currentUserRole } from './selector';
import { REGULAR } from './constants';

/*
handle(REQUIRE_USER).if(!currentUser)
    .causes(setGuestUser).if(!token)
    .causes(readUserApi).if(token).then
        .handle(SUCCESS)
            .causes(setUser).with(payload).otherwise
        .handle(FAIL)
            .causes(setGuestUser);
 */

export function* userSaga() {
    while (true) {
        const user = yield select(currentUser);
        // NOTHING
        if (!user) {
            yield take(REQUIRE_USER);
            const token = localStorage.getItem('token');
            if (token) {
                // REQUIRE_USER causes READ_USER_API if (!user && token)
                yield put(readUserApi(token));

                const userDto = yield take([ READ_USER_API + SUCCESS, READ_USER_API + FAIL ]);
                if (!userDto.payload || userDto.error) {
                    localStorage.removeItem('token');
                    yield put(setGuestUser());
                } else {
                    yield put(setUser(userDto.payload));
                }
            } else {
                yield put(setGuestUser());
            }
        }
        const role = yield select(currentUserRole);
        // GUEST or whatever
        if (role !== REGULAR) {
            const loginRun = yield take(USER_LOGIN);
            yield put(userLoginApi(loginRun.payload));

            const loginData = yield take([
                USER_LOGIN_API + SUCCESS,
                USER_LOGIN_API + FAIL,
            ]);

            if (!loginData.payload || loginData.error) {
                continue;
            } else {
                localStorage.setItem('token', loginData.payload.token);
                yield put(setUser(loginData.payload.user));
            }
        }
        // REGULAR
        yield take(USER_LOGOUT);

        localStorage.removeItem('token');
        yield put(setGuestUser());
    }
}
