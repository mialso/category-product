import { SUCCESS } from 'remote/api';
import { openModal, closeModal } from 'ui/modal';
import {
    READ_CATEGORIES, READ_CATEGORIES_API, CREATE_CATEGORY, UPDATE_CATEGORY,
    SUBMIT_CATEGORY, CREATE_CATEGORY_API, UPDATE_CATEGORY_API,
    readCategoriesApi, setCategories, createCategoryApi, updateCategoryApi,
} from './action';
import { ASKED } from '../constants';
import { MODE_EDIT, MODE_CREATE } from './constants';

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
        case UPDATE_CATEGORY:
        case CREATE_CATEGORY: {
            dispatch(openModal());
            break;
        }
        case CREATE_CATEGORY_API + SUCCESS:
        case UPDATE_CATEGORY_API + SUCCESS: {
            dispatch(closeModal());
            break;
        }
        case SUBMIT_CATEGORY: {
            const { mode, edit: { id } } = getState().category;
            const { name, parentId } = message.payload;
            const category = { name, parentId, id };
            switch (mode) {
                case MODE_CREATE: {
                    setTimeout(() => withToken(dispatch, createCategoryApi(category)), TIMEOUT);
                    break;
                }
                case MODE_EDIT: {
                    setTimeout(() => withToken(dispatch, updateCategoryApi(category)), TIMEOUT);
                    break;
                }
                default: break;
            }
            break;
        }
        default: break;
    }
}
