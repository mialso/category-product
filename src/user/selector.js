export const currentUser = (state) => ({ user: state.user.currentUser });
export const currentUserRole = (state) => state.user.currentUser ? state.user.currentUser.role : '';
