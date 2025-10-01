import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, confirmPassword }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      navigate("/signin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#405de6] via-[#833ab4] via-[#e1306c] via-[#fd1d1d] to-[#f77737]">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-200 flex flex-col items-center">
        
        {/* Branding */}
        <div className="mb-8 flex flex-col items-center">
          <span className="font-display text-5xl font-extrabold bg-gradient-to-r from-[#405de6] via-[#e1306c] to-[#f77737] bg-clip-text text-transparent tracking-tight mb-2">
            Kurakani
          </span>
          <span className="text-gray-600 text-lg font-medium">
            Create your account
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#405de6] text-gray-800 text-base font-medium placeholder-gray-400"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#833ab4] text-gray-800 text-base font-medium placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#e1306c] text-gray-800 text-base font-medium placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#fd1d1d] text-gray-800 text-base font-medium placeholder-gray-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && (
            <div className="text-red-500 text-sm text-center font-semibold">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-bold tracking-wide text-white bg-gradient-to-r from-[#405de6] via-[#e1306c] to-[#f77737] shadow-md hover:shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full my-6">
          <div className="h-px bg-gray-300 flex-1" />
          <span className="text-gray-500 text-sm font-semibold">OR</span>
          <div className="h-px bg-gray-300 flex-1" />
        </div>

        {/* Social login */}
        <button className="flex items-center justify-center gap-3 w-full py-3 rounded-xl font-semibold text-[#405de6] border border-gray-300 hover:bg-gray-50 transition-all duration-150">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
            alt="facebook"
            className="w-5 h-5"
          />
          Sign up with Facebook
        </button>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-base">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#e1306c] font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
