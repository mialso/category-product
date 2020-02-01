const RESPONSE_NOT_OK = 'RESPONSE_NOT_OK';
const RESPONSE_INVALID_JSON = 'RESPONSE_INVALID_JSON';
const FETCH_SERVICE_INVALID = 'FETCH_SERVICE_INVALID';
const REQUEST_FAIL = 'REQUEST_FAIL';

export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

const BASE_URL = '';
const TIMEOUT = 500;

export const apiStart = (base) => ({
    type: `${base.type}_START`,
    meta: {
        apiStatus: START,
        model: base.meta.model,
    },
});
export const apiSuccess = (base, payload) => ({
    type: `${base.type}_SUCCESS`,
    payload,
    meta: {
        apiStatus: SUCCESS,
        model: base.meta.model,
    },
});
export const apiFail = (base, error) => ({
    type: `${base.type}_FAIL`,
    error,
    meta: {
        apiStatus: FAIL,
        model: base.meta.model,
    },
});

export const handleJson = (response) => {
    if (!response.ok) {
        if (response.json) {
            return response.json().then((jsonError) => Promise.reject(new Error(jsonError.error)));
        }
        return Promise.reject(new Error(RESPONSE_NOT_OK));
    }
    return response.json().then(
        (jsonData) => Promise.resolve(jsonData),
        () => Promise.reject(new Error(RESPONSE_INVALID_JSON)),
    );
};

export const getJsonAuthHeaders = (token) => ({
    Accept: 'application/json',
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
    const {
        token, endpoint, method = 'GET', body,
    } = message.meta;
    apiCall(fetch, handleJson)(
        BASE_URL + endpoint,
        {
            method,
            headers: getJsonAuthHeaders(token),
            body: body ? JSON.stringify(body) : undefined,
        },
    ).then(
        (data) => setTimeout(() => dispatch(apiSuccess(message, data)), TIMEOUT),
        (error) => setTimeout(() => dispatch(apiFail(message, error.message)), TIMEOUT),
    );
    dispatch(apiStart(message));
};
