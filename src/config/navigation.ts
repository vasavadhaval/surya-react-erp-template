import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Layers3,
  Mail,
  MessageSquare,
  Package,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  UsersRound,
} from 'lucide-react';

export type NavigationItem = {
  id: string;
  title: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string | number;
  permission?: string;
  feature?: string;
  children?: NavigationItem[];
};

export type NavigationSection = {
  id: string;
  label: string;
  items: NavigationItem[];
};

const libraryGroup = (id: string, title: string, children: NavigationItem[]): NavigationItem => ({
  id,
  title,
  children,
});

export const navigation: NavigationSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        icon: LayoutDashboard,
        children: [
          { id: 'dashboard-overview', title: 'Overview', href: '/' },
          { id: 'dashboard-analytics', title: 'Analytics', href: '/dashboard/analytics' },
          { id: 'dashboard-sales', title: 'Sales', href: '/dashboard/sales' },
          { id: 'dashboard-ecommerce', title: 'E-Commerce', href: '/dashboard/ecommerce' },
          { id: 'dashboard-crm', title: 'CRM', href: '/dashboard/crm' },
          { id: 'dashboard-finance', title: 'Finance', href: '/dashboard/finance' },
          { id: 'dashboard-logistics', title: 'Logistics', href: '/dashboard/logistics' },
          { id: 'dashboard-project', title: 'Project', href: '/dashboard/project' },
        ],
      },
    ],
  },
  {
    id: 'apps-pages',
    label: 'Apps & Pages',
    items: [
      {
        id: 'users',
        title: 'Users',
        icon: UsersRound,
        permission: 'users.view',
        children: [
          { id: 'users-list', title: 'List', href: '/users' },
          { id: 'users-create', title: 'Add new user', href: '/users/create' },
        ],
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: ShieldCheck,
        permission: 'roles.view',
        children: [
          { id: 'roles', title: 'Roles', href: '/roles' },
          { id: 'permissions', title: 'Permission', href: '/roles' },
        ],
      },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    items: [
      {
        id: 'e-commerce',
        title: 'E-Commerce',
        icon: ShoppingBag,
        feature: 'commerce',
        children: [
          { id: 'products', title: 'Product Catalog', href: '/ecommerce/products' },
          { id: 'add-product', title: 'Add Product', href: '/ecommerce/products/create' },
          { id: 'categories', title: 'Categories', href: '/ecommerce/categories' },
          { id: 'orders', title: 'Orders', href: '/ecommerce/orders', badge: '5' },
          { id: 'customers', title: 'Customers', href: '/ecommerce/customers' },
          { id: 'inventory', title: 'Inventory Depot', href: '/ecommerce/inventory' },
        ],
      },
      { id: 'invoices', title: 'Invoices', href: '/invoices', icon: FileText, badge: '3', feature: 'billing' },
    ],
  },
  {
    id: 'components',
    label: 'Components',
    items: [
      { id: 'component-showcase', title: 'Component Showcase', href: '/components', icon: Blocks, badge: 'v1.0' },
      libraryGroup('cards', 'Cards', [
        { id: 'cards-basic', title: 'Basic', href: '/components/cards/basic' },
        { id: 'cards-advance', title: 'Advance', href: '/components/cards/advance' },
        { id: 'cards-statistics', title: 'Statistics', href: '/components/cards/statistics' },
        { id: 'cards-analytics', title: 'Analytics', href: '/components/cards/analytics' },
        { id: 'cards-actions', title: 'Actions', href: '/components/cards/actions' },
      ]),
      libraryGroup('user-interface', 'User Interface', ['Accordion', 'Alerts', 'Badges', 'Buttons', 'Carousel', 'Collapse', 'Dropdowns', 'Footer', 'List Groups', 'Modals', 'Navbar', 'Offcanvas', 'Pagination & Breadcrumbs', 'Progress', 'Spinners', 'Tabs & Pills', 'Toasts', 'Tooltips & Popovers', 'Typography'].map((title) => ({ id: `ui-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`, title, href: `/components/ui/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` }))),
    ],
  },
  {
    id: 'applications',
    label: 'Applications',
    items: [
      { id: 'calendar', title: 'Calendar', href: '/apps/calendar', icon: CalendarDays, feature: 'calendar' },
      { id: 'kanban', title: 'Kanban Board', href: '/apps/kanban', icon: FolderKanban, feature: 'kanban' },
      { id: 'chat', title: 'Chat Messenger', href: '/apps/chat', icon: MessageSquare, badge: '3', feature: 'chat' },
      { id: 'email', title: 'Email Inbox', href: '/apps/email', icon: Mail, feature: 'email' },
      { id: 'file-manager', title: 'File Manager', href: '/apps/file-manager', icon: Package, feature: 'files' },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'settings', title: 'Settings', href: '/settings', icon: Settings2 },
      { id: 'system-errors', title: 'System & Errors', href: '/system', icon: CircleHelp },
    ],
  },
];

export const navigationDefaults = {
  permissions: ['users.view', 'roles.view'],
  features: ['commerce', 'billing', 'calendar', 'kanban', 'chat', 'email', 'files'],
  fallbackIcon: ChevronRight,
};
