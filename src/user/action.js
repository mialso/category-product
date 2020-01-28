export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_API = 'USER_LOGIN_API';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';

export const READ_USER = 'READ_USER';
export const READ_USER_API = 'READ_USER_API';
export const SET_USER = 'SET_USER';
export const CREATE_USER = 'CREATE_USER';

export const USER_MODEL = 'user';

export const userLogin = (name) => ({
    type: USER_LOGIN,
    payload: name,
});
export const userLogout = () => ({ type: USER_LOGOUT });
export const userLoginApi = (name) => ({
    type: USER_LOGIN_API,
    meta: {
        callApi: true,
        endpoint: `/api/user/login?name=${name}`,
        model: 'user',
    },
});
export const readUser = () => ({ type: READ_USER });
export const readUserApi = (token) => ({
    type: READ_USER_API,
    meta: {
        callApi: true,
        endpoint: '/api/user/me',
        token,
        model: 'user',
    },
});
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});
