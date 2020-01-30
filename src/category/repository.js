import { SUCCESS } from 'remote/api';
import {
    READ_CATEGORIES, READ_CATEGORIES_API, CREATE_CATEGORY,
    readCategoriesApi, setCategories, createCategoryApi,
} from './action';
import { ASKED } from '../constants';

const TIMEOUT = 0;

export function withToken(dispatch, action) {
    const token = localStorage.getItem('token');
    if (token) {
        dispatch(action(token));
    } else {
        dispatch({ type: `ERROR_${action().type}`, error: 'Remote data error: No token' });
    }
}

export function categoryData({ dispatch, getState }, message) {
    switch (message.type) {
        case READ_CATEGORIES: {
            const { category } = getState();
            if (category.dataStatus === ASKED) {
                withToken(dispatch, readCategoriesApi);
            }
            break;
        }
        case READ_CATEGORIES_API + SUCCESS: {
            setTimeout(() => dispatch(setCategories(message.payload)), TIMEOUT);
            break;
        }
        case CREATE_CATEGORY: {
            const { parent, name = 'some' } = message.payload;
            const newCategory = { parent, name };
            setTimeout(() => withToken(dispatch, createCategoryApi(newCategory)), TIMEOUT);
            break;
        }
        default: break;
    }
}
