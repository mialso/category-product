import { put, take, select } from 'redux-saga/effects';
import { SUCCESS, FAIL } from 'app/remote/api';
import { ASKED, READY } from 'app/remote/constants';
import {
    READ_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser,
} from './action';
import { currentUser, currentUserRole } from './selector';
import { GUEST } from './constants';

export function* userSaga() {
    while (true) {
        const user = yield select(currentUser);
        // INIT
        if (!user) {
            yield take(READ_USER);
            const token = localStorage.getItem('token');
            if (token) {
                yield put(readUserApi(token));

                const userDto = yield take([READ_USER_API + SUCCESS, READ_USER_API + FAIL]);
                if (!userDto.payload || userDto.error) {
                    localStorage.removeItem('token');
                    yield put(setUser({ name: '', role: GUEST }));
                } else {
                    yield put(setUser(userDto.payload));
                }
            } else {
                yield put(setUser({ name: '', role: GUEST }));
            }
        }
        // LOGIN
        const role = yield select(currentUserRole);
        if (!role) {
            // TODO: is it an error case???
            continue;
        }
        if (role === GUEST) {
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
        // LOGOUT
        yield take(USER_LOGOUT)

        localStorage.removeItem('token');
        yield put(setUser({ name: '', role: GUEST }));
    }
}
