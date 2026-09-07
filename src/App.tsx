import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { NavigationAccessProvider, type NavigationAccess } from './context/NavigationAccessContext';
import { AppShell } from './components/layout/AppShell';
import { Spinner } from './components/ui/Spinner';

const page = <T extends Record<string, unknown>>(loader: () => Promise<T>, name: keyof T) =>
  lazy(() => loader().then((module) => ({ default: module[name] as ComponentType })));

const OverviewDashboard = page(() => import('./pages/dashboard/OverviewDashboard'), 'OverviewDashboard');
const DashboardVariants = page(() => import('./pages/dashboard/DashboardVariants'), 'DashboardVariants');
const ProductListPage = page(() => import('./pages/ecommerce/ProductListPage'), 'ProductListPage');
const ProductFormPage = page(() => import('./pages/ecommerce/ProductFormPage'), 'ProductFormPage');
const ProductDetailPage = page(() => import('./pages/ecommerce/ProductDetailPage'), 'ProductDetailPage');
const CategoriesPage = page(() => import('./pages/ecommerce/CategoriesPage'), 'CategoriesPage');
const OrderListPage = page(() => import('./pages/ecommerce/OrderListPage'), 'OrderListPage');
const OrderDetailPage = page(() => import('./pages/ecommerce/OrderDetailPage'), 'OrderDetailPage');
const CustomerListPage = page(() => import('./pages/ecommerce/CustomerListPage'), 'CustomerListPage');
const CustomerDetailPage = page(() => import('./pages/ecommerce/CustomerDetailPage'), 'CustomerDetailPage');
const InventoryPage = page(() => import('./pages/ecommerce/InventoryPage'), 'InventoryPage');
const InvoiceListPage = page(() => import('./pages/invoices/InvoiceListPage'), 'InvoiceListPage');
const InvoiceDetailPage = page(() => import('./pages/invoices/InvoiceDetailPage'), 'InvoiceDetailPage');
const UserListPage = page(() => import('./pages/users/UserListPage'), 'UserListPage');
const UserCreatePage = page(() => import('./pages/users/UserCreatePage'), 'UserCreatePage');
const RolesPermissionsPage = page(() => import('./pages/users/RolesPermissionsPage'), 'RolesPermissionsPage');
const CalendarPage = page(() => import('./pages/apps/CalendarPage'), 'CalendarPage');
const KanbanPage = page(() => import('./pages/apps/KanbanPage'), 'KanbanPage');
const ChatPage = page(() => import('./pages/apps/ChatPage'), 'ChatPage');
const EmailPage = page(() => import('./pages/apps/EmailPage'), 'EmailPage');
const FileManagerPage = page(() => import('./pages/apps/FileManagerPage'), 'FileManagerPage');
const ComponentShowcasePage = page(() => import('./pages/ui/ComponentShowcasePage'), 'ComponentShowcasePage');
const CardsPage = page(() => import('./pages/ui/CardsPage'), 'CardsPage');
const UserInterfacePage = page(() => import('./pages/ui/UserInterfacePage'), 'UserInterfacePage');
const SettingsPage = page(() => import('./pages/settings/SettingsPage'), 'SettingsPage');
const AuthPages = page(() => import('./pages/auth/AuthPages'), 'AuthPages');
const SystemPages = page(() => import('./pages/system/SystemPages'), 'SystemPages');

const RouteLoader = () => <div className="grid min-h-[50vh] place-items-center"><Spinner size="lg" label="Loading page" /></div>;

export default function App({ navigationAccess }: { navigationAccess?: NavigationAccess }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <NavigationAccessProvider {...navigationAccess}>
          <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
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
            </Suspense>
          </BrowserRouter>
        </NavigationAccessProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
