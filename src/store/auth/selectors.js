export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoginErrorMsg = (state) => state.auth.loginErrorMsg;
export const selectUserId = (state) => state.auth.userId;