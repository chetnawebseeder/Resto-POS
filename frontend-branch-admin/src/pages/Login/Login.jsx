import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Utensils,
  Mail,
  Send,
  CheckCircle2,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: reduxError } = useSelector((state) => state.auth);

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");

    const result = await dispatch(sendOtp(email.trim()));

    if (result.success) {
      setStep("otp");
      setOtp(Array(6).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");

    const result = await dispatch(
      verifyOtp(email.trim(), otp.join(""))
    );

    if (result.success) {
      navigate("/branch-admin/dashboard");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;

    setOtp(updatedOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-900/80" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-11 h-11 rounded-xl bg-orange-600 flex items-center justify-center">
              <Utensils size={20} />
            </div>

            <span className="text-xl font-bold">RestoPOS</span>
          </div>

          <h1 className="text-5xl font-extrabold leading-tight">
            Restaurant <br />
            <span className="text-orange-500">Management</span> <br />
            Platform
          </h1>

          <p className="mt-6 text-slate-300 max-w-md">
            Complete POS solution with multi-branch management,
            real-time kitchen displays, and comprehensive analytics.
          </p>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Stat label="Branches" value="3" />
            <Stat label="Orders" value="202" />
            <Stat label="Revenue" value="₹1.13L" />
          </div>

          <p className="text-xs text-slate-400">
            Designed &amp; Developed by{" "}
            <span className="font-semibold text-white">
              WebSeeder
            </span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {step === "email" ? (
            <form onSubmit={handleSendOtp}>
              <h2 className="text-3xl font-bold text-slate-900">
                Branch Admin Login
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter your registered email to receive an OTP.
              </p>

              <label className="block mt-8 mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  required
                  placeholder="branchadmin@restopro.in"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              {reduxError && (
                <p className="mt-2 text-sm text-red-500">
                  {reduxError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send OTP
                  </>
                )}
              </button>

              <Footer />
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp(Array(6).fill(""));
                  setError("");
                }}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"
              >
                <ArrowLeft size={14} />
                Back
              </button>

              <h2 className="text-3xl font-bold text-slate-900">
                Verify OTP
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter the OTP sent to{" "}
                <span className="font-semibold">{email}</span>
              </p>

              <div className="flex gap-3 mt-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(index, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(index, e)
                    }
                    className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                ))}
              </div>

              {(error || reduxError) && (
                <p className="mt-3 text-sm text-red-500">
                  {error || reduxError}
                </p>
              )}

              <button
                type="submit"
                disabled={!isOtpComplete || loading}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    Verify & Sign In
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                Didn't receive the OTP?{" "}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSendOtp}
                  className="text-orange-600 hover:underline"
                >
                  Resend OTP
                </button>
              </p>

              <Footer />
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/10 rounded-lg p-3 border border-white/10">
      <p className="text-lg font-bold text-orange-500">{value}</p>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  );
}

function Footer() {
  return (
    <p className="mt-10 border-t pt-4 text-center text-xs text-slate-400">
      Designed &amp; Developed by{" "}
      <span className="font-semibold text-slate-600">
        WebSeeder
      </span>
    </p>
  );
}
export default Login;