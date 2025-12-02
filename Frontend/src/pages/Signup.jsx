import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";

export default function Signup() {
  return (
    <div className="auth-root signup-bg">
      <div className="auth-card">
        <div className="auth-logo">AI</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Start organizing your documents with AI
        </p>

        <form className="auth-form">
          <div className="auth-field">
            <label>Name</label>
            <input type="text" placeholder="Your full name" required />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re‑enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-primary signup-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
