import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import middlewares from './middleware';
import { sagaMiddleware, rootSaga } from './sagas';

export default function configureStore(initState) {
    const items = [ ...middlewares, sagaMiddleware ];
    const middlewareEnhancer = applyMiddleware(...items);
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);

    const store = createStore(rootReducer, initState, composedEnhancers);
    sagaMiddleware.run(rootSaga);
    return store;
}
