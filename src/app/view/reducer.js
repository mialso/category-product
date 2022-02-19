import { DEFAULT_VIEW, VIEW_BY_ID } from './constant';
import { SET_VIEW } from './action';

export { VIEW_MODEL_ID } from './constant';

export const initialState = {
    currentId: DEFAULT_VIEW,
    ids: Object.keys(VIEW_BY_ID),
    byId: VIEW_BY_ID,
};

export const viewReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VIEW: {
            if (action.payload === state.currentId) {
                return state;
            }
            const nextView = state.byId[action.payload];
            if (!nextView) {
                return state;
            }

            return { ...state, currentId: nextView.id }
        }
        default: return state;
    }
}
