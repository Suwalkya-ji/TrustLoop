import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <header class="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-max-width mx-auto px-md flex items-center justify-between">
        <Link to="/" className="flex items-center gap-xs">
          <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold font-display-lg text-lg shadow-sm">
            TL
          </div>
          <span className="font-headline-md text-headline-md tracking-tight text-on-surface">TrustLoop</span>
        </Link>

        <nav className="hidden md:flex items-center gap-md">
          <NavLink
            to="/submit"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-colors ${
                isActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Submit Testimonial
          </NavLink>

          <NavLink
            to="/wall"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-colors ${
                isActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Public Wall
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-label-md text-label-md transition-colors ${
                isActive ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-sm">
          <Link
            to="/dashboard"
            className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-sm text-label-sm hover:brightness-105 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            Moderation Admin
          </Link>
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover shadow-sm border border-outline-variant/30"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          />
        </div>
      </div>
    </header>
  );
}
