export const SET_FORM_PRODUCT = 'SET_FORM_PRODUCT';
export const CHANGE_FORM_PRODUCT = 'CHANGE_FORM_PRODUCT';
export const SUBMIT_FORM_PRODUCT = 'SUBMIT_FORM_PRODUCT';
export const FORM_VALIDATION_FAIL = 'FORM_VALIDATION_FAIL';
export const STOP_FORM_EDIT = 'STOP_FORM_EDIT';

export const setFormProduct = (data) => ({
    type: SET_FORM_PRODUCT,
    payload: data,
});
export const changeFormProduct = (change) => ({
    type: CHANGE_FORM_PRODUCT,
    payload: change,
});
export const submitFormProduct = () => ({ type: SUBMIT_FORM_PRODUCT });
export const formValidationFail = (message) => ({
    type: FORM_VALIDATION_FAIL,
    error: message,
});
export const stopFormEdit = () => ({ type: STOP_FORM_EDIT });
