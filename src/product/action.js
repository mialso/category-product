export const PRODUCT_MODEL = 'product';

export const READ_PRODUCTS = 'READ_PRODUCTS';
export const READ_PRODUCTS_API = 'READ_PRODUCTS_API';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_API = 'CREATE_PRODUCT_API';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_API = 'UPDATE_PRODUCT_API';

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SUBMIT_PRODUCT = 'SUBMIT_PRODUCT';

export const PRODUCT_NORMAL_MODE = 'PRODUCT_NORMAL_MODE';

export const readProducts = () => ({ type: READ_PRODUCTS });
export const readProductsApi = (token) => ({
    type: READ_PRODUCTS_API,
    meta: {
        callApi: true,
        endpoint: `/api/${PRODUCT_MODEL}/all`,
        token,
        model: PRODUCT_MODEL,
    },
});
export const createProduct = (item) => ({
    type: CREATE_PRODUCT,
    payload: item,
    meta: {
        form: true,
    },
});
export const createProductApi = (item) => (token) => ({
    type: CREATE_PRODUCT_API,
    meta: {
        callApi: true,
        method: 'POST',
        endpoint: `/api/${PRODUCT_MODEL}/create`,
        token,
        model: PRODUCT_MODEL,
        body: item,
    },
});
export const updateProduct = (itemId) => ({
    type: UPDATE_PRODUCT,
    payload: itemId,
});
export const updateProductApi = (item) => (token) => ({
    type: UPDATE_PRODUCT_API,
    meta: {
        callApi: true,
        method: 'PUT',
        endpoint: `/api/${PRODUCT_MODEL}/update`,
        token,
        model: PRODUCT_MODEL,
        body: item,
    },
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});
export const submitProduct = (item) => ({
    type: SUBMIT_PRODUCT,
    payload: item,
});
export const productNormalMode = () => ({ type: PRODUCT_NORMAL_MODE });
