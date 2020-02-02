export const PRODUCT_MODEL = 'product';

export const READ_PRODUCTS = 'READ_PRODUCTS';
export const READ_PRODUCTS_API = 'READ_PRODUCTS_API';

export const SET_PRODUCTS = 'SET_PRODUCTS';

export const readProducts = () => ({ type: READ_PRODUCTS });
export const readProductsApi = (token) => ({
    type: READ_PRODUCTS_API,
    meta: {
        callApi: true,
        endpoint: '/api/product/all',
        token,
        model: PRODUCT_MODEL,
    },
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});
