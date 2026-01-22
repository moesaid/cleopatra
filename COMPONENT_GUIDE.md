# Cleopatra Component Guide

A guide to Cleopatra's modular component architecture.

---

## Project Structure

```
src/
├── components/
│   ├── widgets/         # Reusable widgets (navbar, sidebar, charts, stats)
│   ├── ui/              # UI primitives (dropdown, alert, code-block, button)
│   ├── charts/          # Chart components (analytics, sales, summary)
│   ├── animations/      # Animation utilities (view-transitions, scroll-reveal)
│   ├── layout/          # Layout system (start, end, router)
│   └── index.js         # Component registry
├── styles/
│   ├── tailwind.css     # Tailwind v4 configuration
│   └── global.scss      # Global styles + component imports
├── pages/               # Route files only (like Next.js pages/)
│   ├── index.html
│   ├── buttons.html
│   └── ...
├── assets/images/       # Static images
└── js/main.js           # Application entry point
```

---

## Component Categories

### Widgets (`components/widgets/`)
Self-contained, reusable UI sections:
- **navbar** - Top navigation bar
- **sidebar** - Side navigation
- **numbers** - Stat counters
- **quick-info** - Info cards
- **status** - Status indicators
- **best-seller** - Product lists
- **recent-orders** - Order tables

### UI (`components/ui/`)
Atomic UI components:
- **dropdown** - Dropdown menus
- **alert** - Dismissible alerts
- **code-block** - Syntax-highlighted code
- **button** - Button styles

### Charts (`components/charts/`)
Data visualization:
- **analytics** - ApexCharts analytics
- **sales-overview** - Chart.js sales chart
- **summary** - Summary stats chart

### Layout (`components/layout/`)
App shell and routing:
- **start.html** - Page wrapper (open)
- **end.html** - Page wrapper (close)
- **router.js** - SPA client-side router

---

## How Pages Work

Pages are pure route files (like Next.js `pages/` directory):

```html
{{> start}}

<!-- Your page content here -->
<div class="bg-white p-6 rounded-md shadow">
  <h1>Page Title</h1>
</div>

{{> end}}
```

The layout wraps your content with navbar, sidebar, and handles loading.

---

## Tutorial: Creating a New Widget

### 1. Create Directory

```bash
mkdir src/components/widgets/my-widget
```

### 2. Create Files

**`my-widget.html`**
```html
<div class="bg-white rounded-md p-6 shadow">
  <h3 class="font-semibold mb-4">My Widget</h3>
  <div id="my-widget-content"></div>
</div>
```

**`my-widget.js`**
```javascript
export function initMyWidget() {
    const el = document.getElementById('my-widget-content');
    if (el) {
        el.textContent = 'Widget loaded!';
    }
}
```

**`index.js`**
```javascript
export { initMyWidget } from './my-widget.js';
```

### 3. Register in Component Index

```javascript
// src/components/index.js
export { initMyWidget } from './widgets/my-widget';
```

### 4. Initialize in main.js

```javascript
import { initMyWidget } from '../components/widgets/my-widget';
initMyWidget();
```

### 5. Use in Pages

```html
{{> my-widget/my-widget}}
```

---

## SPA Navigation

The router (`components/layout/router.js`) provides single-page app navigation:

- **No full page reloads** - Content fetched via JavaScript
- **Smooth transitions** - 150ms fade between pages
- **History support** - Browser back/forward works
- **Component reinitialization** - Charts and widgets reinit on navigation

---

## Using Components Standalone

Copy any component to another project:

```bash
cp -r src/components/widgets/navbar ./your-project/
```

```javascript
import { initNavbar } from './navbar';
initNavbar();
```
