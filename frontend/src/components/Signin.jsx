import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signin failed");
      if (data.data && data.data.accessToken) {
        localStorage.setItem('accessToken', data.data.accessToken);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary/70">
      <div className="bg-base-100 rounded-2xl shadow-card p-8 w-full max-w-md border border-base-200">
        <h2 className="text-3xl font-display font-bold text-primary text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-base-content font-medium mb-1">Email</label>
            <input
              type="email"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-base-content font-medium mb-1">Password</label>
            <input
              type="password"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-error text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-full text-lg font-semibold tracking-wide shadow-input"
            disabled={loading}
          >
            {loading ? <span className="loading loading-spinner loading-md"></span> : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-base-content">
          Don't have an account?{' '}
          <Link to="/signup" className="text-secondary font-semibold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
