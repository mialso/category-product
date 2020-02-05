import { compose } from 'redux';
import { SUCCESS } from 'remote/api';
import { USER_LOGOUT } from 'user/action';
import {
    READ_PRODUCTS, SET_PRODUCTS, CREATE_PRODUCT, CREATE_PRODUCT_API,
    PRODUCT_NORMAL_MODE, UPDATE_PRODUCT, UPDATE_PRODUCT_API,
} from './action';
import { NOT_ASKED, ASKED, READY } from '../constants';
import { MODE_EDIT, MODE_CREATE, MODE_NORMAL } from './constants';

const initialState = {
    ids: [],
    byId: {},
    categoriesByProduct: {},
    dataStatus: NOT_ASKED,
    mode: MODE_NORMAL,
    edit: {},
};

export const createItem = (data = {}) => ({
    id: data.id || '',
    name: data.name || '',
    price: data.price || '',
    expireDate: data.expireDate || 0,
});

export const addItem = (item) => (state) => ({
    ...state,
    ids: state.ids.concat(item.id), // TODO: possible duplicate
    byId: {
        ...state.byId,
        [item.id]: item,
    },
});
export const updateItem = (item) => (state) => ({
    ...state,
    byId: { ...state.byId, [item.id]: item },
});

export const switchMode = (mode) => (state) => ({ ...state, mode });

export const setEditItem = (itemId, item) => (state) => ({
    ...state,
    edit: item || state.byId[itemId],
});
export const cleanEditItem = (state) => ({ ...state, edit: {} });

export const productReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_PRODUCTS: return { ...state, dataStatus: ASKED };
        case SET_PRODUCTS: {
            const { productMap, categoriesByProduct } = message.payload;
            const ids = Object.keys(productMap);
            return {
                ...state,
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, productId) => ({
                    ...acc,
                    [productId]: createItem(productMap[productId]),
                }), { ...state.byId }),
                dataStatus: READY,
                categoriesByProduct,
            };
        }
        case CREATE_PRODUCT: return compose(
            switchMode(MODE_CREATE),
            setEditItem(null, createItem(message.payload)),
        )(state);
        case CREATE_PRODUCT_API + SUCCESS: return compose(
            switchMode(MODE_NORMAL),
            addItem(createItem(message.payload)),
        )(state);
        case UPDATE_PRODUCT: return compose(
            switchMode(MODE_EDIT),
            setEditItem(message.payload),
        )(state);
        case UPDATE_PRODUCT_API + SUCCESS: return compose(
            switchMode(MODE_NORMAL),
            updateItem(createItem(message.payload)),
        )(state);
        case PRODUCT_NORMAL_MODE: return compose(
            switchMode(MODE_NORMAL),
            cleanEditItem,
        )(state);
        case USER_LOGOUT: {
            return initialState;
        }
        default: return state;
    }
};
