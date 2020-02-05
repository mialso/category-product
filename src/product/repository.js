import { SUCCESS } from 'remote/api';
import { closeModal } from 'ui/modal';
import { withToken } from 'user/repository';
import {
    READ_PRODUCTS, READ_PRODUCTS_API,
    CREATE_PRODUCT_API, UPDATE_PRODUCT_API, SUBMIT_PRODUCT,
    readProductsApi, setProducts, createProductApi, updateProductApi,
} from './action';
import { ASKED } from '../constants';
import { MODE_EDIT, MODE_CREATE } from './constants';

export function productData({ dispatch, getState }, message) {
    switch (message.type) {
        case READ_PRODUCTS: {
            const { product } = getState();
            if (product.dataStatus === ASKED) {
                withToken(dispatch, readProductsApi);
            }
            break;
        }
        case READ_PRODUCTS_API + SUCCESS: {
            dispatch(setProducts(message.payload));
            break;
        }
        case SUBMIT_PRODUCT: {
            const { mode } = getState().product;
            const product = message.payload;
            if (mode === MODE_CREATE) {
                withToken(dispatch, createProductApi(product));
            }
            if (mode === MODE_EDIT) {
                withToken(dispatch, updateProductApi(product));
            }
            break;
        }
        case CREATE_PRODUCT_API + SUCCESS:
        case UPDATE_PRODUCT_API + SUCCESS: {
            dispatch(closeModal());
            break;
        }
        default: break;
    }
}
