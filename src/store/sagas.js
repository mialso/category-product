import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';

import { userSaga } from 'user/saga_repository';

export const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
    yield spawn(userSaga);
}
