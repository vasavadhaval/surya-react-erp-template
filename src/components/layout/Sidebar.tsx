import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  ShoppingBag,
  Users2,
  Building2,
  Truck,
  FolderKanban,
  Package,
  ShoppingCart,
  Users,
  FileText,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Mail,
  Kanban,
  Folder,
  Layers,
  Settings,
  HelpCircle,
  ChevronDown,
  X,
  Sparkles,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MenuItem {
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'primary' | 'warning' | 'success';
  children?: { title: string; href: string; badge?: string }[];
}

interface MenuSection {
  label: string;
  items: MenuItem[];
}

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, mobileSidebarOpen, setMobileSidebarOpen } = useTheme();
  const location = useLocation();

  // Track expanded parent items
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    Dashboards: true,
    'E-Commerce': location.pathname.startsWith('/ecommerce'),
    'User Management': location.pathname.startsWith('/users') || location.pathname.startsWith('/roles'),
    Applications: location.pathname.startsWith('/apps'),
    Components: location.pathname.startsWith('/components'),
  });

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const menuSections: MenuSection[] = [
    {
      label: 'OVERVIEW',
      items: [
        {
          title: 'Dashboards',
          icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
          children: [
            { title: 'Overview', href: '/' },
            { title: 'Analytics', href: '/dashboard/analytics' },
            { title: 'Sales', href: '/dashboard/sales' },
            { title: 'E-Commerce', href: '/dashboard/ecommerce' },
            { title: 'CRM', href: '/dashboard/crm' },
            { title: 'Finance', href: '/dashboard/finance' },
            { title: 'Logistics', href: '/dashboard/logistics' },
            { title: 'Project', href: '/dashboard/project' },
          ],
        },
      ],
    },
    {
      label: 'MANAGEMENT',
      items: [
        {
          title: 'E-Commerce',
          icon: <ShoppingBag className="w-4 h-4 shrink-0" />,
          children: [
            { title: 'Product Catalog', href: '/ecommerce/products' },
            { title: 'Add Product', href: '/ecommerce/products/create' },
            { title: 'Categories', href: '/ecommerce/categories' },
            { title: 'Orders', href: '/ecommerce/orders', badge: '5' },
            { title: 'Customers', href: '/ecommerce/customers' },
            { title: 'Inventory Depot', href: '/ecommerce/inventory' },
          ],
        },
        {
          title: 'User Management',
          icon: <Users className="w-4 h-4 shrink-0" />,
          children: [
            { title: 'Team Users', href: '/users' },
            { title: 'Add New User', href: '/users/create' },
            { title: 'Roles & Permissions', href: '/roles' },
          ],
        },
        {
          title: 'Invoices',
          href: '/invoices',
          icon: <FileText className="w-4 h-4 shrink-0" />,
          badge: '3',
          badgeVariant: 'warning',
        },
      ],
    },
    {
      label: 'APPLICATIONS',
      items: [
        { title: 'Calendar', href: '/apps/calendar', icon: <Calendar className="w-4 h-4 shrink-0" /> },
        { title: 'Kanban Board', href: '/apps/kanban', icon: <Kanban className="w-4 h-4 shrink-0" /> },
        { title: 'Chat Messenger', href: '/apps/chat', icon: <MessageSquare className="w-4 h-4 shrink-0" />, badge: '3', badgeVariant: 'primary' },
        { title: 'Email Inbox', href: '/apps/email', icon: <Mail className="w-4 h-4 shrink-0" /> },
        { title: 'File Manager', href: '/apps/file-manager', icon: <Folder className="w-4 h-4 shrink-0" /> },
      ],
    },
    {
      label: 'SYSTEM & UI',
      items: [
        {
          title: 'UI Components',
          href: '/components',
          icon: <Layers className="w-4 h-4 shrink-0" />,
          badge: 'v1.0',
          badgeVariant: 'success',
        },
        { title: 'Auth Pages', href: '/auth', icon: <Lock className="w-4 h-4 shrink-0" /> },
        { title: 'System & Errors', href: '/system', icon: <AlertTriangle className="w-4 h-4 shrink-0" /> },
        { title: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4 shrink-0" /> },
      ],
    },
  ];

  const renderContent = () => (
    <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-300">
      {/* Brand / Logo Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <div className="w-3.5 h-3.5 bg-white rounded-xs rotate-45 transition-transform group-hover:rotate-90"></div>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-white text-lg tracking-tight leading-none">
                Apex UI
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">
                Laravel Ready
              </span>
            </div>
          )}
        </NavLink>

        {/* Close button on mobile */}
        <button
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
        {menuSections.map((section, idx) => (
          <div key={idx}>
            {!sidebarCollapsed && (
              <div className="px-3 mb-2 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                {section.label}
              </div>
            )}
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = !!expandedMenus[item.title];
                const isActive = item.href
                  ? location.pathname === item.href
                  : item.children?.some(c => location.pathname === c.href);

                if (hasChildren) {
                  return (
                    <li key={itemIdx}>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        title={sidebarCollapsed ? item.title : undefined}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-slate-800 text-white'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={isActive ? 'text-indigo-400' : 'text-slate-400'}>
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && <span>{item.title}</span>}
                        </div>
                        {!sidebarCollapsed && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        )}
                      </button>

                      {/* Submenu */}
                      {!sidebarCollapsed && isExpanded && (
                        <ul className="mt-1 pl-6 pr-2 space-y-1">
                          {item.children!.map((sub, subIdx) => {
                            const isSubActive = location.pathname === sub.href;
                            return (
                              <li key={subIdx}>
                                <NavLink
                                  to={sub.href}
                                  onClick={() => setMobileSidebarOpen(false)}
                                  className={`flex items-center justify-between py-1.5 px-3 rounded-md text-xs font-medium transition-colors ${
                                    isSubActive
                                      ? 'bg-indigo-600 text-white'
                                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                                  }`}
                                >
                                  <span>{sub.title}</span>
                                  {sub.badge && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                                      {sub.badge}
                                    </span>
                                  )}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                }

                // Single link item
                return (
                  <li key={itemIdx}>
                    <NavLink
                      to={item.href!}
                      title={sidebarCollapsed ? item.title : undefined}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span className="opacity-90">{item.icon}</span>
                        {!sidebarCollapsed && <span>{item.title}</span>}
                      </div>
                      {!sidebarCollapsed && item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            item.badgeVariant === 'warning'
                              ? 'bg-amber-500/20 text-amber-300'
                              : item.badgeVariant === 'success'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-indigo-500 text-white'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer Card (Pro Access) */}
      {!sidebarCollapsed && (
        <div className="p-4 bg-slate-800/50 m-4 rounded-xl border border-slate-700/50 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-200">Pro Access</span>
          </div>
          <p className="text-slate-400 text-[10px] leading-relaxed mb-3">
            Modular architecture ready for direct Laravel Sanctum & Inertia integration.
          </p>
          <NavLink
            to="/settings"
            className="block text-center py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            Upgrade Now
          </NavLink>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed inset-y-0 left-0 z-30 transition-all duration-300 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {renderContent()}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] z-50 animate-in slide-in-from-left duration-200">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );
};
