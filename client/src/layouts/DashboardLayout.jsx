import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 transition-all duration-300">
        <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 px-md md:px-lg flex items-center justify-between">
          <div className="flex items-center gap-sm md:gap-md">
            {/* Hamburger button for Mobile/Tablet */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
              aria-label="Toggle navigation"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>

            <nav className="flex items-center gap-md">
              <Link
                to="/wall"
                className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                <span className="hidden sm:inline">View Live Public Wall</span>
                <span className="sm:hidden">Public Wall</span>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-sm">
            <span className="px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm hidden sm:inline-block">
              Live Moderation Mode
            </span>
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-sm border border-outline-variant/30"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            />
          </div>
        </header>

        <main className="relative pt-16 bg-surface min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
