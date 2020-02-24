import { put, take, select } from 'redux-saga/effects';
import { SUCCESS } from 'app/remote/api';
import { ASKED, READY } from 'app/remote/constants';
import {
    READ_USER, USER_LOGIN, USER_LOGIN_API, READ_USER_API, USER_LOGOUT,
    readUserApi, userLoginApi, setUser,
} from './action';
import { GUEST } from './constants';

export function* userSaga() {
    while (true) {
        const { user } = yield select();
        // INIT
        if (user.dataStatus !== READY) {
            yield take(READ_USER);
            const { user } = yield select();
            // TODO: refactor this because of saga usage
            if (user.dataStatus === ASKED) {
                const token = localStorage.getItem('token');
                if (token) {
                    put(readUserApi(token));

                    const userDto = yield take(READ_USER_API + SUCCESS);
                    yield put(setUser(userDto.payload));
                } else {
                    yield put(setUser({ name: '', role: GUEST }));
                }
            }
        }
        // LOGIN
        const loginRun = yield take(USER_LOGIN);
        yield put(userLoginApi(loginRun.payload));

        const loginSuccess = yield take(USER_LOGIN_API + SUCCESS);

        localStorage.setItem('token', loginSuccess.payload.token);
        yield put(setUser(loginSuccess.payload.user));

        // LOGOUT
        yield take(USER_LOGOUT)

        localStorage.removeItem('token');
        yield put(setUser({ name: '', role: GUEST }));
    }
}
