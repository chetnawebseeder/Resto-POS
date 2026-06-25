import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href = "http://localhost:5173/login"; 
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-slate-500">Redirecting to login...</p>
    </div>
  );
}