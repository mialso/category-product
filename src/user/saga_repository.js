import { put, take, select } from 'redux-saga/effects';
import { SUCCESS, FAIL } from 'app/remote/api';
import { ASKED, READY } from 'app/remote/constants';
import {
    REQUIRE_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser,
} from './action';
import { currentUser, currentUserRole } from './selector';
import { GUEST, REGULAR } from './constants';

export function* userSaga() {
    while (true) {
        const user = yield select(currentUser);
        // NOTHING
        if (!user) {
            yield take(REQUIRE_USER);
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
        yield take(USER_LOGOUT)

        localStorage.removeItem('token');
        yield put(setUser({ name: '', role: GUEST }));
    }
}
