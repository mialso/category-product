import { CHANGE_TITLE, CHANGE_COMPANY_NAME } from './action';

export { OFFER_MODEL_ID } from './constant';

const initialState = {
    title: 'sample title',
    companyName: 'unknown company',
};

export const offerReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TITLE: {
            return {
                ...state,
                title: action.payload.title,
            };
        }
        case CHANGE_COMPANY_NAME: {
            return {
                ...state,
                companyName: action.payload.companyName,
            };
        }
        default: return state;
    }
};
