import { createSlice } from "@reduxjs/toolkit";

const FIXED_OTP = "123456";

const MOCK_USERS = {
  "branchadmin@restopro.in": "branch_admin",
};

const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("authUser"));
  } catch {
    return null;
  }
})();

const initialState = {
  email: storedUser?.email || null,
  isAuthenticated: !!storedUser,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    sendOtpSuccess: (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
    },

    sendOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    verifyOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.email = action.payload.email;

      localStorage.setItem(
        "authUser",
        JSON.stringify({
          email: action.payload.email,
        })
      );
    },

    verifyOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.error = null;
      localStorage.removeItem("authUser");
    },
  },
});

export const {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  logout,
} = authSlice.actions;

// Send OTP
export const sendOtp = (email) => async (dispatch) => {
  dispatch(sendOtpStart());

  try {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!MOCK_USERS[email]) {
      throw new Error("This email is not registered.");
    }

    console.log(`OTP: ${FIXED_OTP}`);

    dispatch(sendOtpSuccess({ email }));

    return { success: true };
  } catch (err) {
    dispatch(sendOtpFailure(err.message));
    return { success: false };
  }
};

// Verify OTP
export const verifyOtp = (email, otp) => async (dispatch) => {
  dispatch(verifyOtpStart());

  try {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (otp !== FIXED_OTP) {
      throw new Error("Invalid OTP. Please try again.");
    }

    if (!MOCK_USERS[email]) {
      throw new Error("Email not authorized.");
    }

    dispatch(verifyOtpSuccess({ email }));

    return { success: true };
  } catch (err) {
    dispatch(verifyOtpFailure(err.message));
    return { success: false };
  }
};

export default authSlice.reducer;