import { START, SUCCESS, FAIL } from './api';
import { USER_MODEL } from '../user/action';

const initialState = {
    [USER_MODEL]: {
        isLoading: false,
        error: '',
    },
    loading: [],
};

export const isAnyLoading = ({ api }) => !!api.loading.length;

export const apiReducer = (state = initialState, message) => {
    const apiStatus = message.meta && message.meta.apiStatus;
    const model = message.meta && message.meta.model;
    switch (apiStatus) {
        case START: return {
            ...state,
            loading: state.loading.concat(model),
            [model]: {
                isLoading: true,
                error: '',
            },
        };
        case SUCCESS: return {
            ...state,
            loading: state.loading.filter((item) => item !== model),
            [model]: {
                isLoading: false,
                error: '',
            },
        };
        case FAIL: return {
            ...state,
            loading: state.loading.filter((item) => item !== model),
            [model]: {
                isLoading: false,
                error: message.error,
            },
        };
        default: return state;
    }
};
