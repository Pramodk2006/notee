import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/NavBar.css";

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    nav("/login", { replace: true });
  };

  // show auth links when on public pages (home, login, signup)
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPage = publicPaths.includes(location.pathname);

  // try fallback to localStorage name if AuthContext user is not set
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem("mv_user") || "null");
    } catch {
      return null;
    }
  })();
  const displayName = user?.name || stored?.name || "User";
  const initial = (displayName && String(displayName)[0])?.toUpperCase() || "U";

  return (
    <header className="topbar">
      <div className="container">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <div className="logo-bubble">AI</div>
          <div>
            <div className="brand-name">AI Memory Vault</div>
            <div className="brand-sub muted">Your intelligent document companion</div>
          </div>
        </Link>

        <div className="nav-right">
          <button
            className="menu-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle menu"
            type="button"
          >
            ☰
          </button>

          <nav className={`nav-menu ${open ? "open" : ""}`}>
            {isPublicPage ? (
              <>
                <Link to="/login" className="cta-btn" onClick={() => setOpen(false)}>Log In</Link>
                <Link to="/signup" className="cta-btn" onClick={() => setOpen(false)}>Sign Up</Link>
              </>
            ) : (
              <>
                <div className="user-pill" title={displayName}>
                  <div className="avatar">{initial}</div>
                  <div style={{ marginLeft: 6 }}>{displayName}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="cta-btn"
                  style={{ background: "transparent", border: "1px solid rgba(15,23,42,0.04)", color: "#071130" }}
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
