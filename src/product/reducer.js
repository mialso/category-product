import { compose } from 'redux';
import { NOT_ASKED, ASKED, READY } from 'app/remote/constants';
import { SUCCESS } from 'app/remote/api';
import { USER_LOGOUT } from 'user/action';
import { DELETE_CATEGORY_API } from 'category/action';
import {
    READ_PRODUCTS, SET_PRODUCTS, CREATE_PRODUCT_API, UPDATE_PRODUCT_API,
    SET_PRODUCT_BY_CATEGORY, DELETE_PRODUCT_API,
} from './action';

const initialState = {
    ids: [],
    byId: {},
    dataStatus: NOT_ASKED,
    byCategoryId: {},
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
export const removeItem = ({ id }) => (state) => ({
    ...state,
    ids: state.ids.filter((itemId) => itemId !== id),
    byId: { ...state.byId, [id]: undefined },
});

export const updateCategoryIdsMap = (item) => (state) => {
    const { id, categoryIds = [] } = item;
    // remove any invalid
    const categoryIdsMap = Object.keys(state.byCategoryId).reduce(
        (acc, categoryId) => {
            if (categoryIds.includes(categoryId)) {
                return acc;
            }
            return {
                ...acc,
                [categoryId]: state.byCategoryId[categoryId]
                    .filter((productId) => productId !== id),
            };
        },
        state.byCategoryId,
    );
    // add any new
    return {
        ...state,
        byCategoryId: categoryIds.reduce(
            (acc, categoryId) => {
                if (acc[categoryId].includes(id)) {
                    return acc;
                }
                return { ...acc, [categoryId]: acc[categoryId].concat(id) };
            },
            categoryIdsMap,
        ),
    };
};

export const productReducer = (state = initialState, message) => {
    switch (message.type) {
        case READ_PRODUCTS: return { ...state, dataStatus: ASKED };
        case SET_PRODUCTS: {
            const { productMap } = message.payload;
            const ids = Object.keys(productMap);
            return {
                ...state,
                ids: state.ids.concat(ids.filter((id) => !state.ids.includes(id))),
                byId: ids.reduce((acc, productId) => ({
                    ...acc,
                    [productId]: createItem(productMap[productId]),
                }), { ...state.byId }),
                dataStatus: READY,
            };
        }
        case SET_PRODUCT_BY_CATEGORY: {
            return { ...state, byCategoryId: message.payload };
        }
        case CREATE_PRODUCT_API + SUCCESS: {
            return addItem(createItem(message.payload))(state);
        }
        case UPDATE_PRODUCT_API + SUCCESS: return compose(
            updateCategoryIdsMap(message.payload),
            updateItem(createItem(message.payload)),
        )(state);
        case DELETE_PRODUCT_API + SUCCESS: return compose(
            updateCategoryIdsMap(message.payload),
            removeItem(message.payload),
        )(state);
        case USER_LOGOUT: {
            return initialState;
        }
        case DELETE_CATEGORY_API + SUCCESS: return ({
            ...state,
            byCategoryId: {
                ...state.byCategoryId,
                [message.payload.id]: null,
            },
        });
        default: return state;
    }
};
