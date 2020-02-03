import { SUCCESS } from 'remote/api';
import { openModal, closeModal } from 'ui/modal';
import { withToken } from 'user/repository';
import {
    READ_PRODUCTS, READ_PRODUCTS_API, CREATE_PRODUCT, UPDATE_PRODUCT,
    CREATE_PRODUCT_API, UPDATE_PRODUCT_API, SUBMIT_PRODUCT,
    readProductsApi, setProducts, createProductApi, updateProductApi,
} from './action';
import { ASKED } from '../constants';
import { MODE_EDIT, MODE_CREATE } from './constants';
import { validator } from './validation';

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
        case UPDATE_PRODUCT:
        case CREATE_PRODUCT: {
            dispatch(openModal());
            break;
        }
        case SUBMIT_PRODUCT: {
            const { mode, edit: { id } } = getState().product;
            const { name, price, expireDate } = message.payload;
            const product = {
                name, price, expireDate, id,
            };
            const productValidator = Object.keys(product).reduce(
                (acc, key) => {
                    const value = product[key];
                    let validatedValue = null;
                    if (validator[key]) {
                        const keyValidator = validator[key](value);
                        validatedValue = keyValidator[key];
                        if (!keyValidator.isValid) {
                            return {
                                ...acc,
                                hasErrors: true,
                                errors: { ...acc.errors, [key]: keyValidator.message },
                                values: { ...acc.values, [key]: validatedValue },
                            };
                        }
                    }
                    return {
                        ...acc,
                        values: { ...acc.values, [key]: validatedValue },
                    };
                },
                { hasErrors: false, errors: {}, values: {} },
            );
            if (productValidator.hasErrors) {
                dispatch({
                    type: 'PRODUCT_VALIDATION_FAIL',
                    error: Object.keys(productValidator.errors).join(', '),
                });
                break;
            }
            switch (mode) {
                case MODE_CREATE: {
                    setTimeout(() => withToken(dispatch, createProductApi(productValidator.values)), TIMEOUT);
                    break;
                }
                case MODE_EDIT: {
                    setTimeout(() => withToken(dispatch, updateProductApi(productValidator.values)), TIMEOUT);
                    break;
                }
                default: break;
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
