import { combineReducers } from 'redux';
import { userReducer } from 'user/reducer';
import { categoryReducer } from 'category/reducer';
import { apiReducer } from 'remote/reducer';
import { modalReducer } from 'ui/modal';
import { errorReducer } from '../app/error';

export default combineReducers({
    api: apiReducer,
    error: errorReducer,
    modal: modalReducer,
    user: userReducer,
    category: categoryReducer,
});
