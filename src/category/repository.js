import { SUCCESS } from 'app/remote/api';
import { ASKED } from 'app/remote/constants';
import { openModal, closeModal } from 'app/modal';
import { withToken } from 'user/repository';
import { READ_PRODUCTS_API } from 'product/action';
import {
    READ_CATEGORIES, READ_CATEGORIES_API, CREATE_CATEGORY, UPDATE_CATEGORY,
    SUBMIT_CATEGORY, CREATE_CATEGORY_API, UPDATE_CATEGORY_API, DELETE_CATEGORY,
    DELETE_CATEGORY_API,
    readCategoriesApi, setCategories, createCategoryApi, updateCategoryApi,
    setCategoryByProduct, deleteCategoryApi,
} from './action';
import { MODE_EDIT, MODE_CREATE } from './constants';
import { categoryById } from './selector';

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
            dispatch(setCategories(message.payload.categoryMap));
            break;
        }
        case READ_PRODUCTS_API + SUCCESS: {
            dispatch(setCategoryByProduct(message.payload.categoriesByProduct));
            break;
        }
        case UPDATE_CATEGORY:
        case CREATE_CATEGORY: {
            dispatch(openModal());
            break;
        }
        case DELETE_CATEGORY_API + SUCCESS:
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
                    withToken(dispatch, createCategoryApi(category));
                    break;
                }
                case MODE_EDIT: {
                    withToken(dispatch, updateCategoryApi(category));
                    break;
                }
                default: break;
            }
            break;
        }
        case DELETE_CATEGORY: {
            const id = message.payload;
            const { children } = categoryById(id)(getState());
            if (Array.isArray(children) && children.length) {
                dispatch({ type: 'ERROR_MESSAGE', error: 'Unable to delete category with children' });
                break;
            }
            withToken(dispatch, deleteCategoryApi(id));
            break;
        }
        default: break;
    }
}
