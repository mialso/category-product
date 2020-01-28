import { combineReducers } from 'redux';
import { userReducer } from '../user/reducer';
import { apiReducer } from '../app/remote';
import { errorReducer } from '../app/error';

export default combineReducers({
    user: userReducer,
    api: apiReducer,
    error: errorReducer,
});
