# Using Apex UI in a project

Apex UI is a frontend template. It does not depend on Laravel, Node, or any specific backend. A future application can connect its own authentication and API without rewriting the visual components.

## Reusing a component

Import a component from `src/components/ui` and compose it inside a page:

```tsx
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';

export function ExamplePage() {
  return (
    <Alert variant="success" title="Saved">
      The record was updated. <Button size="sm">View record</Button>
    </Alert>
  );
}
```

Reusable components contain presentation and interaction behavior. Pages contain business-specific content and API calls.

## Adding navigation

Add a leaf item to `src/config/navigation.ts`:

```ts
{
  id: 'reports-sales',
  title: 'Sales report',
  href: '/reports/sales',
  permission: 'reports.view',
  feature: 'reports'
}
```

Then add the matching route in `src/App.tsx`. Do not add a menu link until its page route exists; this keeps demos free from broken links.

Navigation supports unlimited child groups. `permission` and `feature` are optional. Without them, an item is visible to everyone.

## Connecting access rules later

Pass permissions and enabled features from any authentication system into the application:

```tsx
<App navigationAccess={{
  permissions: currentUser.permissions,
  features: account.enabledFeatures
}} />
```

If these values are omitted, all configured navigation items are visible. This makes the UI useful before a backend is connected.

## Themes

`ThemeProvider` owns `light`, `dark`, and `system` modes. The selected preference is stored locally and applied to the document before React starts, preventing a theme flash during refresh.

## Page loading

Pages are loaded on demand. Adding a new page with the same lazy-page helper keeps it out of the initial application download until a user visits its route.
