import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const preloadedState = {
  auth: {
    email: JSON.parse(localStorage.getItem("authUser"))?.email || null,
    role: JSON.parse(localStorage.getItem("authUser"))?.role || null,
    isAuthenticated: !!localStorage.getItem("authUser"),
    loading: false,
    error: null,
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});