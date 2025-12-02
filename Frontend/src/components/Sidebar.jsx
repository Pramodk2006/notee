import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ className = "" }) {
  return (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar-top">
        <h4>Vault</h4>
        <p className="muted">Your private memory</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({isActive})=> isActive ? "active" : ""}>Overview</NavLink>
        <NavLink to="/dashboard/files" className={({isActive})=> isActive ? "active" : ""}>Files</NavLink>
        <NavLink to="/dashboard/search" className={({isActive})=> isActive ? "active" : ""}>Search</NavLink>
        <NavLink to="/dashboard/notes" className={({isActive})=> isActive ? "active" : ""}>Notes</NavLink>
        <NavLink to="/dashboard/settings" className={({isActive})=> isActive ? "active" : ""}>Settings</NavLink>
      </nav>
      <div className="sidebar-footer muted">v0.1 • Demo</div>
    </aside>
  );
}
