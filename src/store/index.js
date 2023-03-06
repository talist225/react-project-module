import { authActions } from "./auth";
import authSlice from "./auth";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
