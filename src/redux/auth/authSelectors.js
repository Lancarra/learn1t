export const userSelector = (state) => state.auth.user;
export const tokenSelector = (state) => state.auth.token;
export const loggedInSelector = (state) => state.auth.isLoggedIn;
export const refresingSelector = (state) => state.auth.isRefreshing;
export const achievementSelector = (state) => state.auth.achievement;