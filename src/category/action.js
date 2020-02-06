export const CATEGORY_MODEL = 'category';

export const READ_CATEGORIES = 'READ_CATEGORIES';
export const READ_CATEGORIES_API = 'READ_CATEGORIES_API';
export const READ_CATEGORIES_BYPRODUCT_API = 'READ_CATEGORIES_BYPRODUCT_API';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const CREATE_CATEGORY_API = 'CREATE_CATEGORY_API';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const UPDATE_CATEGORY_API = 'UPDATE_CATEGORY_API';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const DELETE_CATEGORY_API = 'DELETE_CATEGORY_API';

export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_CATEGORY_BYPRODUCT = 'SET_CATEGORY_BYPRODUCT';
export const SUBMIT_CATEGORY = 'SUBMIT_CATEGORY';

export const TOGGLE_SELECT_CATEGORY = 'TOGGLE_SELECT_CATEGORY';

export const CATEGORY_NORMAL_MODE = 'CATEGORY_NORMAL_MODE';

export const readCategories = () => ({ type: READ_CATEGORIES });
export const readCategoriesApi = (token) => ({
    type: READ_CATEGORIES_API,
    meta: {
        callApi: true,
        endpoint: `/api/${CATEGORY_MODEL}/all`,
        token,
        model: CATEGORY_MODEL,
    },
});
export const readCategoriesByProductApi = (token) => ({
    type: READ_CATEGORIES_API,
    meta: {
        callApi: true,
        endpoint: `/api/${CATEGORY_MODEL}/byProduct/all`,
        token,
        model: CATEGORY_MODEL,
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
        endpoint: `/api/${CATEGORY_MODEL}/create`,
        token,
        model: CATEGORY_MODEL,
        body: item,
    },
});
export const updateCategory = (itemId) => ({
    type: UPDATE_CATEGORY,
    payload: itemId,
});
export const updateCategoryApi = (item) => (token) => ({
    type: UPDATE_CATEGORY_API,
    meta: {
        callApi: true,
        method: 'PUT',
        endpoint: `/api/${CATEGORY_MODEL}/update`,
        token,
        model: CATEGORY_MODEL,
        body: item,
    },
});
export const deleteCategory = (id) => ({
    type: DELETE_CATEGORY,
    payload: id,
});
export const deleteCategoryApi = (id) => (token) => ({
    type: DELETE_CATEGORY_API,
    meta: {
        callApi: true,
        endpoint: `/api/${CATEGORY_MODEL}/delete?id=${id}`,
        token,
        model: CATEGORY_MODEL,
    },
});

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});
export const setCategoryByProduct = (categories) => ({
    type: SET_CATEGORY_BYPRODUCT,
    payload: categories,
});
export const submitCategory = (item) => ({
    type: SUBMIT_CATEGORY,
    payload: item,
});

export const toggleSelectCategory = (itemId) => ({
    type: TOGGLE_SELECT_CATEGORY,
    payload: itemId,
});

export const categoryNormalMode = () => ({ type: CATEGORY_NORMAL_MODE });
