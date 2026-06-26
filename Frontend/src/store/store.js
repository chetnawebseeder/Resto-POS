import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const authUser = JSON.parse(localStorage.getItem("superAdminAuth"));

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      email: authUser?.email || null,
      role: authUser?.role || null,
      isAuthenticated: !!authUser,
      loading: false,
      error: null,
    },
  },
});