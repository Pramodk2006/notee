import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Lightweight permissive auth for local demo.
 * - Accepts any email/password
 * - Extracts user name from email (before @), formats it
 * - Persists user in localStorage under "mv_user"
 */

const AuthContext = createContext(null);

function formatNameFromEmail(email) {
  if (!email) return "User";
  const local = String(email).split("@")[0] || "user";
  // replace separators with spaces and capitalize words
  return local
    .replace(/[._+]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0]?.toUpperCase() + s.slice(1))
    .join(" ");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mv_user");
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("mv_user", JSON.stringify(user));
      else localStorage.removeItem("mv_user");
    } catch (e) {}
  }, [user]);

  const login = async ({ email }) => {
    const name = formatNameFromEmail(email);
    const u = { id: Date.now().toString(), email, name };
    setUser(u);
    return u;
  };

  const signup = async ({ email, name: providedName }) => {
    const name = providedName?.trim() || formatNameFromEmail(email);
    const u = { id: Date.now().toString(), email, name };
    setUser(u);
    return u;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
