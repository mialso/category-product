import {
    SET_FORM_PRODUCT, CHANGE_FORM_PRODUCT, STOP_FORM_EDIT, TOGGLE_FORM_PRISTINE,
} from './action';
import { MODE_NORMAL } from './constants';

const initialState = {
    product: {},
    category: {},
    mode: MODE_NORMAL,
    isPristine: true,
};

export const formProduct = ({ form }) => ({
    product: form.product,
    mode: form.mode,
    isPristine: form.isPristine,
});

export const formReducer = (state = initialState, message) => {
    switch (message.type) {
        case SET_FORM_PRODUCT: {
            const { product, mode } = message.payload;
            return { ...state, product, mode };
        }
        case CHANGE_FORM_PRODUCT: {
            return {
                ...state,
                product: {
                    ...state.product,
                    ...message.payload,
                },
            };
        }
        case TOGGLE_FORM_PRISTINE: return { ...state, isPristine: !state.isPristine };
        case STOP_FORM_EDIT: return initialState;
        default: return state;
    }
};
