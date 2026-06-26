import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Utensils, Mail, Send, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react";
import { sendOtp, verifyOtp } from "../../store/slices/authSlice";
import { useNavigate} from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.auth);

  const [step, setStep]   = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp]     = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs         = useRef([]);

  const isOtpComplete = otp.every((d) => d !== "");
  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!email) return;
    setError("");

    const result = await dispatch(sendOtp(email));

    if (result.success) {
      setStep("otp");
      setOtp(Array(6).fill(""));
      setTimeout(() => inputRefs.current[0]?.focus(), 0);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleVerify = async (e) => {
  e.preventDefault();
  const result = await dispatch(verifyOtp(email, otp.join("")));
  if (result.success) {
    navigate("/super-admin/dashboard");
  } else {
    setError("Invalid OTP. Please try again.");
  }
};
  return (
    <div className="min-h-screen flex bg-slate-50">
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
            Complete POS solution with multi-branch management, real-time
            kitchen displays, and comprehensive analytics.
          </p>
        </div>

        <div className="relative z-10">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Stat label="Active Branches" value="3" />
            <Stat label="Daily Orders"    value="202" />
            <Stat label="Today Revenue"   value="₹1.13L" />
          </div>
          <p className="text-xs text-slate-400">
            Designed &amp; Developed by{" "}
            <span className="font-semibold text-white">WebSeeder</span>
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">

          {step === "email" ? (
            <form onSubmit={handleSendOtp}>
              <h2 className="text-3xl font-bold text-slate-900">Sign In</h2>
              <p className="mt-2 text-sm text-slate-500">
                Enter your email to receive a one-time password
              </p>

              <label className="block mt-8 mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="superadmin@restopro.in"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Email error */}
              {reduxError && (
                <p className="mt-2 text-sm text-red-500">{reduxError}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold transition-colors"
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  : <><Send size={16} /> Send OTP</>
                }
              </button>

              <Footer />
            </form>

          ) : (
            <form onSubmit={handleVerify}>
              <button
                type="button"
                onClick={() => { setStep("email"); setError(""); }}
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <h2 className="text-3xl font-bold text-slate-900">Verify OTP</h2>
              <p className="mt-2 text-sm text-slate-500">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-slate-700">{email}</span>
              </p>

              <label className="block mt-8 mb-2 text-sm font-medium text-slate-700">
                Enter OTP
              </label>
              <div className="flex gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-12 h-12 text-center text-lg font-semibold rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors ${
                      digit ? "border-orange-500 bg-orange-50" : "border-slate-200"
                    }`}
                  />
                ))}
              </div>
              {(error || reduxError) && (
                <p className="mt-3 text-sm text-red-500">{error || reduxError}</p>
              )}

              <button
                type="submit"
                disabled={!isOtpComplete || loading}
                className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold transition-colors ${
                  isOtpComplete && !loading
                    ? "bg-orange-600 hover:bg-orange-700 cursor-pointer"
                    : "bg-orange-300 cursor-not-allowed"
                }`}
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Verifying...</>
                  : <><CheckCircle2 size={16} /> Verify &amp; Sign In</>
                }
              </button>

              <p className="mt-4 text-center text-sm text-slate-500">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="text-orange-600 font-medium hover:underline disabled:opacity-50"
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
    <p className="mt-10 text-center text-xs text-slate-400 border-t border-slate-200 pt-4">
      Designed &amp; Developed by{" "}
      <span className="font-semibold text-slate-600">WebSeeder</span>
    </p>
  );
}

export default Login

