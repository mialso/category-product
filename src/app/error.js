export const MARK_SEEN_ERROR = 'MARK_SEEN_ERROR';

const initialState = {
    unseen: [],
};

export const markSeenError = () => ({ type: MARK_SEEN_ERROR });

export const unseenError = ({ error }) => error.unseen[0];

export const errorReducer = (state = initialState, message) => {
    switch (message.type) {
        case MARK_SEEN_ERROR: {
            return {
                unseen: state.unseen.slice(1),
            };
        }
        default: {
            const { error } = message;
            if (error) {
                return {
                    unseen: state.unseen.concat(error),
                };
            }
            return state;
        }
    }
};
