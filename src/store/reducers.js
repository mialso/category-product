import { combineReducers } from 'redux';
import { userReducer } from 'user/reducer';
import { categoryReducer } from 'category/reducer';
import { apiReducer } from 'remote/reducer';
import { errorReducer } from '../app/error';

export default combineReducers({
    api: apiReducer,
    error: errorReducer,
    user: userReducer,
    category: categoryReducer,
});
