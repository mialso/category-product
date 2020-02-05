import { SET_FORM_PRODUCT, CHANGE_FORM_PRODUCT, STOP_FORM_EDIT } from './action';
import { MODE_EDIT, MODE_CREATE, MODE_NORMAL } from './constants';

const initialState = {
    product: {},
    category: {},
    mode: MODE_NORMAL,
};

export const formProduct = ({ form }) => ({
    product: form.product,
    mode: form.mode,
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
        case STOP_FORM_EDIT: return initialState;
        default: return state;
    }
};
