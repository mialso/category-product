export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });

const initialState = {
    isOpen: false,
};

export const modalReducer = (state = initialState, message) => {
    switch (message.type) {
        case OPEN_MODAL: {
            return { isOpen: true };
        }
        case CLOSE_MODAL: {
            return { isOpen: false };
        }
        default: return state;
    }
};
