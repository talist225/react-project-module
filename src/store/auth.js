import { createSlice } from "@reduxjs/toolkit";

const intitalAuthState = {
  loggedIn: false,
  userData: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: intitalAuthState,
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.isAdmin = action.payload.isAdmin;
      state.userData = action.payload;
    },
    logout: (state) => intitalAuthState,

    updateUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
