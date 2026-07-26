import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-container-low z-50 flex flex-col border-r border-outline-variant/20 shadow-sm transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-md mb-md border-b border-outline-variant/10">
          <Link to="/" onClick={onClose} className="flex items-center gap-xs">
            <div className="w-8 h-8 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold font-display-lg text-lg shadow-sm">
              TL
            </div>
            <span className="font-headline-md text-headline-md text-on-surface">TrustLoop</span>
          </Link>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <nav className="flex-1 px-sm space-y-base">
          <NavLink
            to="/dashboard"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-md py-sm font-label-md transition-all rounded-lg ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined mr-md text-[20px]">dashboard</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/wall"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-md py-sm font-label-md transition-all rounded-lg ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined mr-md text-[20px]">star</span>
            Public Wall
          </NavLink>

          <NavLink
            to="/submit"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-md py-sm font-label-md transition-all rounded-lg ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            <span className="material-symbols-outlined mr-md text-[20px]">rate_review</span>
            Submit Form
          </NavLink>
        </nav>

        <div className="p-md border-t border-outline-variant/20">
          <div className="flex items-center gap-sm p-sm rounded-lg bg-surface-container-lowest border border-outline-variant/20 shadow-xs">
            <img
              alt="Admin Profile"
              className="w-8 h-8 rounded-full object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            />
            <div className="flex flex-col truncate">
              <span className="font-label-md text-label-sm text-on-surface truncate">Admin Moderator</span>
              <span className="text-label-sm text-outline text-[11px] truncate">admin@trustloop.io</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
