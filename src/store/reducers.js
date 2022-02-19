import { combineReducers } from 'redux';
import { userReducer } from 'user/reducer';
import { categoryReducer } from 'category/reducer';
import { productReducer } from 'product/reducer';
import { apiReducer } from 'app/remote/reducer';
import { modalReducer } from 'app/modal';
import { errorReducer } from 'app/error';
import { formReducer } from 'app/form/reducer';
import { VIEW_MODEL_ID, viewReducer } from 'app/view/reducer';
import { OFFER_MODEL_ID, offerReducer } from 'offer/reducer';

export default combineReducers({
    api: apiReducer,
    error: errorReducer,
    modal: modalReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    form: formReducer,
    [VIEW_MODEL_ID]: viewReducer,
    [OFFER_MODEL_ID]: offerReducer,
});
