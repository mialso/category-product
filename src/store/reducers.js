import { combineReducers } from 'redux';
import { userReducer } from 'user/reducer';
import { categoryReducer } from 'category/reducer';
import { productReducer } from 'product/reducer';
import { apiReducer } from 'remote/reducer';
import { modalReducer } from 'ui/modal';
import { errorReducer } from '../app/error';
import { formReducer } from '../app/form/reducer';

export default combineReducers({
    api: apiReducer,
    error: errorReducer,
    modal: modalReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    form: formReducer,
});
