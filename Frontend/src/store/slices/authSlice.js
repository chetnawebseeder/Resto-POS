import { createSlice } from "@reduxjs/toolkit";

const FIXED_OTP = "123456";

const MOCK_USERS = {
  "superadmin@restopro.in":  "super_admin",
  "branchadmin@restopro.in": "branch_admin",
};

const SUPER_ADMIN_URL  = "http://localhost:5173"; 
const BRANCH_ADMIN_URL = "http://localhost:5174"; 

const storedUser = (() => {
  try { return JSON.parse(localStorage.getItem("authUser")); }
  catch { return null; }
})();

const initialState = {
  email:           storedUser?.email || null,
  role:            storedUser?.role  || null,
  isAuthenticated: !!storedUser,
  loading:         false,
  error:           null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendOtpStart:   (state)         => { state.loading = true;  state.error = null; },
    sendOtpSuccess: (state, action) => { state.loading = false; state.email = action.payload.email; },
    sendOtpFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    verifyOtpStart:   (state)         => { state.loading = true;  state.error = null; },
    verifyOtpFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    verifyOtpSuccess: (state, action) => {
      state.loading         = false;
      state.isAuthenticated = true;
      state.email           = action.payload.email;
      state.role            = action.payload.role;
      localStorage.setItem("authUser", JSON.stringify({
        email: action.payload.email,
        role:  action.payload.role,
      }));
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.email           = null;
      state.role            = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const {
  sendOtpStart, sendOtpSuccess, sendOtpFailure,
  verifyOtpStart, verifyOtpSuccess, verifyOtpFailure,
  logout,
} = authSlice.actions;

export const sendOtp = (email) => async (dispatch) => {
  dispatch(sendOtpStart());
  try {
    await new Promise((r) => setTimeout(r, 600));
    if (!MOCK_USERS[email]) throw new Error("This email is not registered.");
    dispatch(sendOtpSuccess({ email }));
    return { success: true };
  } catch (err) {
    dispatch(sendOtpFailure(err.message));
    return { success: false };
  }
};

export const verifyOtp = (email, otp) => async (dispatch) => {
  dispatch(verifyOtpStart());
  try {
    await new Promise((r) => setTimeout(r, 600));
    if (otp !== FIXED_OTP) throw new Error("Invalid OTP. Please try again.");

    const role = MOCK_USERS[email];
    if (!role) throw new Error("Email not authorized.");

    dispatch(verifyOtpSuccess({ email, role }));
    if (role === "super_admin") {
      window.location.href = `${SUPER_ADMIN_URL}/super-admin/dashboard`;
    } else if (role === "branch_admin") {
      window.location.href = `${BRANCH_ADMIN_URL}/branch-admin/dashboard`;
    }

    return { success: true, role };
  } catch (err) {
    dispatch(verifyOtpFailure(err.message));
    return { success: false };
  }
};

export default authSlice.reducer;