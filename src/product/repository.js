import { SUCCESS } from 'remote/api';
// import { openModal, closeModal } from 'ui/modal';
import { withToken } from 'user/repository';
import {
    READ_PRODUCTS, READ_PRODUCTS_API,
    readProductsApi, setProducts,
} from './action';
import { ASKED } from '../constants';

const TIMEOUT = 0;

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
            setTimeout(() => dispatch(setProducts(message.payload)), TIMEOUT);
            break;
        }
        default: break;
    }
}
