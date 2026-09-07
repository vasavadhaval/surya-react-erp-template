import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AppShell } from './components/layout/AppShell';

// Dashboard Pages
import { OverviewDashboard } from './pages/dashboard/OverviewDashboard';
import { DashboardVariants } from './pages/dashboard/DashboardVariants';

// E-Commerce Pages
import { ProductListPage } from './pages/ecommerce/ProductListPage';
import { ProductFormPage } from './pages/ecommerce/ProductFormPage';
import { ProductDetailPage } from './pages/ecommerce/ProductDetailPage';
import { CategoriesPage } from './pages/ecommerce/CategoriesPage';
import { OrderListPage } from './pages/ecommerce/OrderListPage';
import { OrderDetailPage } from './pages/ecommerce/OrderDetailPage';
import { CustomerListPage } from './pages/ecommerce/CustomerListPage';
import { CustomerDetailPage } from './pages/ecommerce/CustomerDetailPage';
import { InventoryPage } from './pages/ecommerce/InventoryPage';

// Invoicing & Billing
import { InvoiceListPage } from './pages/invoices/InvoiceListPage';
import { InvoiceDetailPage } from './pages/invoices/InvoiceDetailPage';

// User & Role Management
import { UserListPage } from './pages/users/UserListPage';
import { UserCreatePage } from './pages/users/UserCreatePage';
import { RolesPermissionsPage } from './pages/users/RolesPermissionsPage';

// Applications
import { CalendarPage } from './pages/apps/CalendarPage';
import { KanbanPage } from './pages/apps/KanbanPage';
import { ChatPage } from './pages/apps/ChatPage';
import { EmailPage } from './pages/apps/EmailPage';
import { FileManagerPage } from './pages/apps/FileManagerPage';

// System & UI
import { ComponentShowcasePage } from './pages/ui/ComponentShowcasePage';
import { CardsPage } from './pages/ui/CardsPage';
import { UserInterfacePage } from './pages/ui/UserInterfacePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { AuthPages } from './pages/auth/AuthPages';
import { SystemPages } from './pages/system/SystemPages';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Standalone Authentication Screen Route */}
            <Route path="/auth" element={<AuthPages />} />

            {/* Main Application Layout with Sidebar & Header */}
            <Route path="/" element={<AppShell />}>
              {/* Dashboards */}
              <Route index element={<OverviewDashboard />} />
              <Route path="dashboard/:variant" element={<DashboardVariants />} />

              {/* E-Commerce */}
              <Route path="ecommerce">
                <Route index element={<Navigate to="/ecommerce/products" replace />} />
                <Route path="products" element={<ProductListPage />} />
                <Route path="products/create" element={<ProductFormPage />} />
                <Route path="products/:id/edit" element={<ProductFormPage />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="categories" element={<CategoriesPage />} />
                <Route path="orders" element={<OrderListPage />} />
                <Route path="orders/:id" element={<OrderDetailPage />} />
                <Route path="customers" element={<CustomerListPage />} />
                <Route path="customers/:id" element={<CustomerDetailPage />} />
                <Route path="inventory" element={<InventoryPage />} />
              </Route>

              {/* Invoices */}
              <Route path="invoices" element={<InvoiceListPage />} />
              <Route path="invoices/new" element={<InvoiceDetailPage />} />
              <Route path="invoices/:id" element={<InvoiceDetailPage />} />

              {/* User Management */}
              <Route path="users" element={<UserListPage />} />
              <Route path="users/create" element={<UserCreatePage />} />
              <Route path="roles" element={<RolesPermissionsPage />} />

              {/* Applications */}
              <Route path="apps">
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="kanban" element={<KanbanPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="email" element={<EmailPage />} />
                <Route path="file-manager" element={<FileManagerPage />} />
              </Route>

              {/* Design System / UI Showcase */}
              <Route path="components" element={<ComponentShowcasePage />} />
              <Route path="components/cards/:variant" element={<CardsPage />} />
              <Route path="components/cards" element={<Navigate to="/components/cards/basic" replace />} />
              <Route path="components/ui/:component?" element={<UserInterfacePage />} />

              {/* Settings */}
              <Route path="settings" element={<SettingsPage />} />

              {/* System & Error Pages */}
              <Route path="system" element={<SystemPages />} />
            </Route>

            {/* Fallback 404 Route */}
            <Route path="*" element={<SystemPages />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
