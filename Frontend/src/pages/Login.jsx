import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/login.css";
import { User } from "lucide-react";

// helper: derive a friendly name from email
function formatNameFromEmail(email) {
  if (!email) return "User";
  return String(email)
    .split("@")[0]
    .replace(/[._+]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map(s => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // perform login (AuthContext may persist user); still save a simple mv_user record locally
      await login({ email });

      const name = formatNameFromEmail(email);
      // store minimal user info locally so dashboard can read it directly
      localStorage.setItem("mv_user", JSON.stringify({ email, name }));

      // navigate to dashboard (dashboard can read user from AuthContext or localStorage)
      nav("/dashboard", { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div className="auth-root login-bg">
      <div className="auth-card">
        <div className="auth-logo">AI</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your AI Memory Vault account</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-row">
            <label className="auth-remember">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="auth-link" onClick={() => nav("/forgot")}>
              Forgot password?
            </button>
          </div>

          {error && <div className="input-error" role="alert">{error}</div>}

          <button type="submit" className="auth-primary">
            Log In
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <a href="/signup" className="auth-link">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
