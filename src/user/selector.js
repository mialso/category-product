export const currentUser = (state) => {
    const { Just: user } = state.user.currentUser;
    return user || null;
};
export const currentUserRole = (state) => {
    const { Just: user } = state.user.currentUser;
    return user.role || '';
};
