export const CATEGORY_MODEL = 'category';

export const READ_CATEGORIES = 'READ_CATEGORIES';
export const READ_CATEGORIES_API = 'READ_CATEGORIES_API';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_API = 'CREATE_CATEGORY_API';

export const SET_CATEGORIES = 'SET_CATEGORIES';

export const readCategories = () => ({ type: READ_CATEGORIES });
export const readCategoriesApi = (token) => ({
    type: READ_CATEGORIES_API,
    meta: {
        callApi: true,
        endpoint: '/api/category/all',
        token,
        model: 'category',
    },
});
export const createCategory = (item) => ({
    type: CREATE_CATEGORY,
    payload: item,
});
export const createCategoryApi = (item) => (token) => ({
    type: CREATE_CATEGORY_API,
    meta: {
        callApi: true,
        method: 'POST',
        endpoint: '/api/category/create',
        token,
        model: 'category',
        body: item,
    },
});

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});
