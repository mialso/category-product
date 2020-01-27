import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import middlewares from './middleware';

export default function configureStore(initState) {
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);

    return createStore(rootReducer, initState, composedEnhancers);
}
