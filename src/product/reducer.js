import { USER_LOGOUT } from 'user/action';
import {
    READ_PRODUCTS, SET_PRODUCTS,
} from './action';
import { NOT_ASKED, ASKED, READY } from '../constants';

const initialState = {
    ids: [],
    byId: {},
    dataStatus: NOT_ASKED,
};

export const productState = ({ product }) => product;
export const productById = (id) => ({ product }) => product.byId[id];
export const productIds = ({ product }) => product.ids;

export const productReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_PRODUCTS: return { ...state, dataStatus: ASKED };
        case SET_PRODUCTS: {
            const productMap = message.payload;
            const ids = Object.keys(productMap);
            return {
                ...state,
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, productId) => ({
                    ...acc,
                    [productId]: productMap[productId],
                }), { ...state.byId }),
                dataStatus: READY,
            };
        }
        case USER_LOGOUT: {
            return initialState;
        }
        default: return state;
    }
};
