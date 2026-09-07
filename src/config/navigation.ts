import type { LucideIcon } from 'lucide-react';
import {
  Blocks,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  CircleHelp,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Layers3,
  LockKeyhole,
  Mail,
  MessageSquare,
  Package,
  PanelsTopLeft,
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

const examples = (prefix: string, titles: string[]): NavigationItem[] =>
  titles.map((title) => ({
    id: `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title,
    href: `/library/${prefix}/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  }));

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
          ...examples('dashboard', ['Analytics', 'Sales', 'E-Commerce', 'CRM', 'Finance', 'Logistics', 'Project']),
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
          ...examples('users', ['View', 'Account', 'Security', 'Billing & Plans', 'Notifications', 'Connections']),
        ],
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: ShieldCheck,
        permission: 'roles.view',
        children: [
          { id: 'roles', title: 'Roles', href: '/roles' },
          ...examples('permissions', ['Permission']),
        ],
      },
      libraryGroup('pages', 'Pages', [
        libraryGroup('user-profile', 'User Profile', examples('profile', ['Profile', 'Teams', 'Projects', 'Connections'])),
        libraryGroup('account-settings', 'Account Settings', examples('account', ['Account', 'Security', 'Billing & Plans', 'Notifications', 'Connections'])),
        ...examples('pages', ['FAQ', 'Pricing']),
        libraryGroup('misc', 'Misc', examples('misc', ['Error', 'Under Maintenance', 'Coming Soon', 'Not Authorized'])),
      ]),
      libraryGroup('authentications', 'Authentications', [
        { id: 'auth-page', title: 'Login', href: '/auth', icon: LockKeyhole },
        libraryGroup('register', 'Register', examples('register', ['Basic', 'Cover', 'Multi-steps'])),
        libraryGroup('verify-email', 'Verify Email', examples('verify-email', ['Basic', 'Cover'])),
        libraryGroup('reset-password', 'Reset Password', examples('reset-password', ['Basic', 'Cover'])),
        libraryGroup('forgot-password', 'Forgot Password', examples('forgot-password', ['Basic', 'Cover'])),
        libraryGroup('two-steps', 'Two Steps', examples('two-steps', ['Basic', 'Cover'])),
      ]),
      libraryGroup('wizard-examples', 'Wizard Examples', examples('wizards', ['Checkout', 'Property Listing', 'Create Deal'])),
      { id: 'modal-examples', title: 'Modal Examples', href: '/library/modals/examples' },
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
      libraryGroup('extended-ui', 'Extended UI', [
        ...examples('extended-ui', ['Avatar', 'BlockUI', 'Drag & Drop', 'Media Player', 'Perfect Scrollbar', 'Star Ratings', 'SweetAlert2', 'Text Divider']),
        libraryGroup('timeline', 'Timeline', examples('timeline', ['Basic', 'Fullscreen'])),
        ...examples('extended-ui', ['Tour', 'Treeview', 'Miscellaneous']),
      ]),
      libraryGroup('icons', 'Icons', examples('icons', ['Lucide', 'Font Awesome'])),
    ],
  },
  {
    id: 'forms-tables',
    label: 'Forms & Tables',
    items: [
      libraryGroup('form-elements', 'Form Elements', examples('form-elements', ['Basic Inputs', 'Input Groups', 'Custom Options', 'Editors', 'File Upload', 'Pickers', 'Select & Tags', 'Sliders', 'Switches', 'Extras'])),
      libraryGroup('form-layouts', 'Form Layouts', examples('form-layouts', ['Vertical Form', 'Horizontal Form', 'Sticky Actions'])),
      libraryGroup('form-wizard', 'Form Wizard', examples('form-wizard', ['Numbered', 'Icons'])),
      ...examples('forms', ['Form Validation', 'Tables']),
      libraryGroup('datatables', 'Datatables', examples('datatables', ['Basic', 'Advanced', 'Extensions'])),
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
      { id: 'layout-settings', title: 'Layout Settings', href: '/library/layout/settings', icon: PanelsTopLeft },
      { id: 'reports', title: 'Reports', href: '/library/reports', icon: ChartNoAxesCombined },
    ],
  },
];

export const navigationDefaults = {
  permissions: ['users.view', 'roles.view'],
  features: ['commerce', 'billing', 'calendar', 'kanban', 'chat', 'email', 'files'],
  fallbackIcon: ChevronRight,
};
