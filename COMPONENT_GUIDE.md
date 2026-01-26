# Component Guide

> How to use and create components in Cleopatra v2.0

---

## Component Categories

### Layout (`components/layout/`)

App shell and page wrappers:

| Component | Purpose |
|-----------|---------|
| `start.html` | Opens page, includes head, navbar, sidebar |
| `end.html` | Closes page, includes footer scripts |

### Widgets (`components/widgets/`)

Reusable dashboard widgets:

| Widget | Description |
|--------|-------------|
| `navbar/` | Top navigation bar with search, notifications |
| `sidebar/` | Side navigation with collapsible groups |
| `stats-card/` | Metric display cards |
| `recent-orders/` | Order tables |
| `quick-info/` | Info summary cards |

### UI (`components/ui/`)

Atomic UI components:

| Component | Description |
|-----------|-------------|
| `button/` | Button styles and variants |
| `alert/` | Dismissible alerts |
| `modal/` | Modal dialogs |
| `dropdown/` | Dropdown menus |
| `code-block/` | Syntax highlighted code |

### Charts (`components/charts/`)

Data visualization:

| Chart | Library | Purpose |
|-------|---------|---------|
| `analytics/` | ApexCharts | Analytics line charts |
| `sales-overview/` | Chart.js | Sales bar charts |
| `summary/` | ApexCharts | Summary donut charts |

### Dashboard-Specific Components

| Folder | Dashboard |
|--------|-----------|
| `crypto/` | Crypto dashboard (trending tokens, market tables) |
| `ecommerce/` | E-commerce (products, orders, sales) |
| `mission-control/` | Project management (tasks, team) |

---

## Using Components

### In Pages

Include components using Handlebars partials:

```html
{{> start title="My Page" }}

<div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
  {{> widgets/stats-card/stats-card }}
  {{> widgets/recent-orders/recent-orders }}
</div>

{{> end }}
```

### With Parameters

Pass data to components:

```html
{{> widgets/stats-card/stats-card 
    title="Revenue" 
    value="$45,231" 
    trend="+12.5%" 
}}
```

---

## Creating a New Widget

### Step 1: Create Directory

```bash
mkdir src/components/widgets/my-widget
```

### Step 2: Create Template

**`my-widget.html`**
```html
<div class="bg-card rounded-lg border p-6">
  <h3 class="font-semibold text-foreground mb-4">My Widget</h3>
  <div id="my-widget-content">
    <!-- Widget content -->
  </div>
</div>
```

### Step 3: Add JavaScript (Optional)

**`my-widget.js`**
```javascript
export function initMyWidget() {
  const el = document.getElementById('my-widget-content');
  if (el) {
    // Initialize widget logic
  }
}
```

### Step 4: Add Styles (Optional)

**`my-widget.scss`**
```scss
.my-widget {
  // Widget-specific styles
}
```

Import in `global.scss`:
```scss
@import 'components/widgets/my-widget/my-widget';
```

### Step 5: Initialize in main.js

```javascript
import { initMyWidget } from '../components/widgets/my-widget/my-widget.js';

// Call on page load
initMyWidget();
```

### Step 6: Use in Pages

```html
{{> widgets/my-widget/my-widget }}
```

---

## Theme-Aware Components

Use Tailwind's theme classes for automatic theme support:

```html
<!-- These adapt to light/dark mode automatically -->
<div class="bg-card text-foreground border-border">
  <h3 class="text-foreground">Title</h3>
  <p class="text-muted-foreground">Description</p>
</div>
```

**Available theme classes:**

| Class | Description |
|-------|-------------|
| `bg-background` | Page background |
| `bg-card` | Card background |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary text |
| `border-border` | Border color |
| `bg-primary` | Primary accent |
| `text-primary` | Primary accent text |

---

## SPA Navigation

Components are automatically reinitialized when navigating between pages.

If your component needs cleanup, register a destroy function:

```javascript
export function initMyWidget() {
  // Setup
  const interval = setInterval(() => {}, 1000);
  
  // Cleanup on navigation
  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
}
```

---

## Best Practices

1. **Keep widgets self-contained** - All files in one folder
2. **Use semantic class names** - `bg-card` not `bg-white`
3. **Follow the naming convention** - `widget-name/widget-name.html`
4. **Document parameters** - Add comments for partial parameters
5. **Test both themes** - Verify light and dark mode work
