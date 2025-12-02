// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  MessageCircle,
  Brain,
  Bell,
  LogOut,
  Upload,
  PieChart,
  Folder,
  Search,
} from "lucide-react";
import "../Styles/Dashboard.css";

/**
 * Full Dashboard.jsx — ready to drop into your project.
 * - Uses semantic classNames that match the provided Dashboard.css
 * - Client-side demo only (uploads are not persisted)
 * - Routes: /dashboard (overview), /dashboard/documents, /dashboard/chat, /dashboard/quiz, /dashboard/reminders, /dashboard/settings
 */

/* --- sample categories used in the UI --- */
const CATEGORIES = [
  { id: 1, name: "Medical", files: 234, color: "#ffe5e5" },
  { id: 2, name: "Finance", files: 456, color: "#e9ffe5" },
  { id: 3, name: "Study", files: 789, color: "#f0e9ff" },
  { id: 4, name: "Receipts", files: 123, color: "#fff3da" },
  { id: 5, name: "Notes", files: 567, color: "#e7f0ff" },
  { id: 6, name: "General", files: 345, color: "#f5f5f5" },
];

/* --- small reusable components --- */
function StatCard({ label, value, change, icon: Icon }) {
  return (
    <div className="stat-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div className="stat-left">
          <div className="stat-icon" aria-hidden>
            {Icon ? <Icon /> : "📦"}
          </div>
          <div>
            <div className="label">{label}</div>
            <div className="value">{value}</div>
          </div>
        </div>
      </div>
      <div className="delta" style={{ marginTop: 6, color: "#10b981", fontSize: 12 }}>
        {change}
      </div>
    </div>
  );
}

function UploadArea({ onFiles }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length) onFiles?.(dropped);
  };

  return (
    <div
      className="upload-area"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      role="region"
      aria-label="File upload drop area"
    >
      <div className="upload-icon" aria-hidden>
        <Upload />
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontWeight: 600, color: "#0f1724" }}>Drop files here or click to upload</div>
        <div className="upload-line">Support for images, PDFs, audio, video, and documents</div>

        <div style={{ marginTop: 12 }}>
          <label className="btn" style={{ cursor: "pointer" }}>
            Upload
            <input
              type="file"
              multiple
              onChange={(e) => onFiles?.(Array.from(e.target.files))}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function CategoriesCard({ categories }) {
  return (
    <div className="categories-card">
      <h3>Categories</h3>
      <div className="categories-grid">
        {categories.map((c) => (
          <div
            key={c.id}
            className="category-tile"
            style={{ background: c.color }}
            role="button"
            tabIndex={0}
            onClick={() => alert(`Open category: ${c.name} (demo)`)}
            onKeyDown={(e) => e.key === "Enter" && alert(`Open category: ${c.name} (demo)`)}
          >
            <div className="title">{c.name}</div>
            <div className="meta">{c.files} files</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Main dashboard home content --- */
function DashboardHome({ user }) {
  const [files, setFiles] = useState([]);
  const stats = [
    { label: "Storage Used", value: "48.2 GB", change: "+8%" },
    { label: "Recent Activity", value: "18 today", change: "+24%" },
    { label: "AI Insights", value: "156", change: "+32%" },
    { label: "Quizzes", value: "42", change: "+12%" },
  ];

  return (
    <div className="content">
      <div className="greeting-row">
        <div>
          <h1>
            Good morning, {(JSON.parse(localStorage.getItem("mv_user") || "null")?.name) || user?.name || "User"} 👋
          </h1>
          <p className="text-muted">Here’s an overview of your documents today.</p>
        </div>

        <div style={{ minWidth: 260 }}>
          {/* stats grid */}
          <div className="stats-grid" >
            {stats.map((s) => (
              <StatCard key={s.label} label={s.label} value={s.value} change={`${s.change} from last month`} />
            ))}
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div>
          <UploadArea onFiles={(fl) => setFiles((prev) => [...fl, ...prev])} />

          <div className="activity-card" style={{ marginTop: 18 }}>
            <h3 style={{ margin: 0, marginBottom: 10 }}>Recent Activity</h3>
            <ul className="activity-list">
              {files.length === 0 ? (
                <li className="text-muted">No recent activity yet — upload files to see activity.</li>
              ) : (
                files.slice(0, 6).map((f, idx) => (
                  <li key={idx}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        📄
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{f.name || f.title || `File ${idx + 1}`}</div>
                        <div className="small text-muted">{f.size ? `${Math.round(f.size / 1024)} KB` : "Uploaded just now"}</div>
                      </div>
                      <div className="small text-muted">Now</div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="distribution-card">
            <h3 style={{ marginTop: 0 }}>Category Distribution</h3>

            <div className="distribution-row" style={{ marginTop: 10 }}>
              {[
                { label: "Medical", pct: "35%", css: "progress-med" },
                { label: "Finance", pct: "25%", css: "progress-fin" },
                { label: "Study", pct: "20%", css: "progress-study" },
              ].map((r) => (
                <div key={r.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, color: "var(--muted)" }}>
                    <span>{r.label}</span>
                    <span>{r.pct}</span>
                  </div>
                  <div className="progress-track">
                    <div className={`progress-bar ${r.css}`} style={{ width: r.pct }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <CategoriesCard categories={CATEGORIES} />

          <div className="activity-card" style={{ marginTop: 16 }}>
            <h3 style={{ margin: 0, marginBottom: 10 }}>Quick Actions</h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link to="/dashboard/documents" className="btn" style={{ textDecoration: "none" }}>View Documents</Link>
              <Link to="/dashboard/chat" className="btn btn-ghost" style={{ textDecoration: "none" }}>Open AI Chat</Link>
              <Link to="/dashboard/quiz" className="btn" style={{ textDecoration: "none" }}>Generate Quiz</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* --- Sidebar component (semantic markup) --- */
function DashboardSidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard" },
    { icon: FileText, label: "Documents", route: "/dashboard/documents" },
    { icon: MessageCircle, label: "AI Chat", route: "/dashboard/chat" },
    { icon: Brain, label: "Quiz", route: "/dashboard/quiz" },
    { icon: Bell, label: "Reminders", route: "/dashboard/reminders" },
    { icon: Folder, label: "Settings", route: "/dashboard/settings" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-top">
        <div className="logo">MV</div>
        <div className="brand-text" style={{ fontWeight: 700 }}>Memory Vault</div>
      </div>

      <nav>
        {navItems.map((item, idx) => (
          <button key={item.label} className={`nav-btn ${idx === 0 ? "active" : ""}`} type="button" aria-label={item.label}>
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ marginTop: "auto" }} className="sidebar-bottom">
        <button className="logout-btn" type="button" onClick={() => alert("Logout (demo)")}>
          <LogOut />
          <span style={{ marginLeft: 10 }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* --- Topbar component --- */
function DashboardTopbar({ onSearch }) {
  return (
    <div className="topbar">
      <div className="top-left">
        <div className="search-field">
          <div className="search-icon" aria-hidden><Search /></div>
          <input placeholder="Search documents..." onKeyDown={(e) => e.key === "Enter" && onSearch?.(e.target.value)} />
        </div>
      </div>

      <div className="top-actions">
        <button className="icon-btn" title="Notifications" aria-label="Notifications">
          <Bell />
          <span className="icon-badge" />
        </button>
      </div>
    </div>
  );
}

/* --- Main page (routes wrapper) --- */
export default function Dashboard() {
  const handleSearch = (q) => {
    if (!q) return;
    alert(`Search demo: ${q}`);
  };

  return (
    <div className="dashboard-root">
      <DashboardSidebar />

      <main className="dashboard-main">
        <DashboardTopbar onSearch={handleSearch} />

        <div className="content">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="documents" element={<div className="card">Documents list (placeholder)</div>} />
            <Route path="chat" element={<div className="card">AI Chat (placeholder)</div>} />
            <Route path="quiz" element={<div className="card">Quiz generator (placeholder)</div>} />
            <Route path="reminders" element={<div className="card">Reminders (placeholder)</div>} />
            <Route path="settings" element={<div className="card">Settings (placeholder)</div>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
