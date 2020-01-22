import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

export default function configureStore(initState) {
    const middlewareEnhancer = applyMiddleware();
    const composedEnhancers = composeWithDevTools(middlewareEnhancer);

    return createStore(rootReducer, initState, composedEnhancers);
}
