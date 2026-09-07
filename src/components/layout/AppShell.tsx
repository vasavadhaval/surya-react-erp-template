import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useTheme } from '../../context/ThemeContext';

export const AppShell: React.FC = () => {
  const { sidebarCollapsed, compactMode } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Fixed/Collapsible Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Sticky Top Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 w-full ${
            compactMode ? 'max-w-6xl mx-auto' : 'max-w-7xl mx-auto'
          }`}
        >
          <Outlet />
        </main>

        {/* Sleek Subfooter */}
        <footer className="border-t border-slate-200/70 dark:border-slate-800/80 py-4 px-6 text-center text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
            <p>© {new Date().getFullYear()} Apex Admin UI. Crafted for modular Laravel & React integrations.</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">● System Operational</span>
              <span className="text-slate-400">v1.2.0-production</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
