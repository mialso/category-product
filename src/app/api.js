const RESPONSE_NOT_OK = 'RESPONSE_NOT_OK';
const RESPONSE_INVALID_JSON = 'RESPONSE_INVALID_JSON';
const FETCH_SERVICE_INVALID = 'FETCH_SERVICE_INVALID';
const REQUEST_FAIL = 'REQUEST_FAIL';

export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

const BASE_URL = '//localhost:5005';

export const apiStart = (base) => ({ type: `${base.type}_START` });
export const apiSuccess = (base, payload) => ({
    type: `${base.type}_SUCCESS`,
    payload,
});
export const apiFail = (base, error) => ({
    type: `${base.type}_FAIL`,
    payload: error,
});

export const handleJson = (response) => {
    if (!response.ok) {
        return Promise.reject(new Error(RESPONSE_NOT_OK));
    }
    return response.json().then(
        (jsonData) => Promise.resolve(jsonData),
        () => Promise.reject(new Error(RESPONSE_INVALID_JSON)),
    );
};

export const getJsonAuthHeaders = (token) => ({
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
});

export const apiCall = (fetchService, handler) => (url = '', props = {}) => {
    if (!fetchService) {
        return Promise.reject(new Error(FETCH_SERVICE_INVALID));
    }
    return fetchService(url, props)
        .then(handler, () => Promise.reject(new Error(REQUEST_FAIL)));
};

export const api = ({ dispatch }, message) => {
    if (!(message.meta && message.meta.callApi)) {
        return;
    }
    const { token, endpoint } = message.meta;
    apiCall(fetch, handleJson)(
        BASE_URL + endpoint,
        { headers: getJsonAuthHeaders(token) },
    ).then(
        (data) => dispatch(apiSuccess(message, data)),
        (error) => dispatch(apiFail(message, error.message)),
    );
    dispatch(apiStart(message));
};
