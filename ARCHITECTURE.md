# Architecture

> Project structure and rules for Cleopatra v2.0

---

## Overview

Cleopatra uses a **widget-based architecture** where pages are simple route files and all UI logic lives in self-contained components.

---

## Directory Structure

```
src/
├── components/
│   ├── layout/          # App shell (start.html, end.html)
│   ├── widgets/         # Dashboard widgets (stats, charts, tables)
│   ├── ui/              # UI primitives (buttons, alerts, modals)
│   ├── charts/          # Chart components (ApexCharts, Chart.js)
│   ├── crypto/          # Crypto dashboard specific widgets
│   ├── ecommerce/       # E-commerce dashboard specific widgets
│   └── mission-control/ # Mission control dashboard widgets
├── pages/               # Route files only (like Next.js pages/)
│   ├── index.html                 # Analytics dashboard
│   ├── index-crypto.html          # Crypto dashboard
│   ├── index-e-commerce.html      # E-commerce dashboard
│   ├── index-mission-control.html # Mission control dashboard
│   ├── apps/                      # App pages (chat, email, etc.)
│   ├── components/                # Component demos
│   └── auth/                      # Authentication pages
├── styles/
│   ├── global.scss      # Global styles + imports
│   ├── landing.scss     # Landing page styles
│   └── tailwind.css     # Tailwind v4 configuration
├── js/
│   └── main.js          # Entry point
└── public/
    └── images/          # Static images
```

---

## Core Principles

### 1. Pages = Routes

Pages in `src/pages/` are pure route files. They contain only content, not layout.

```html
{{> start title="Dashboard" }}

<!-- Page content here -->
<div class="grid grid-cols-1 gap-4">
  {{> widgets/stats-card }}
</div>

{{> end }}
```

### 2. Self-Contained Widgets

Every widget lives in its own folder with all related files:

```
components/widgets/stats-card/
├── stats-card.html    # Template
├── stats-card.js      # Logic (optional)
└── stats-card.scss    # Styles (optional)
```

### 3. Layout System

The `start.html` and `end.html` partials wrap every page:

- **start.html** - Opens HTML, includes head, navbar, sidebar
- **end.html** - Closes main content, includes scripts

---

## Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Widgets in folders | `widgets/card/card.html` | `widgets/card.html` |
| Pages are routes only | `pages/dashboard.html` | `pages/partials/` |
| Use layout wrappers | `{{> start}}...{{> end}}` | Raw HTML without layout |

---

## Dashboards

| Dashboard | Path | Description |
|-----------|------|-------------|
| Analytics | `pages/index.html` | Default analytics dashboard |
| E-commerce | `pages/index-e-commerce.html` | Sales and products |
| Crypto | `pages/index-crypto.html` | Token tracking |
| Mission Control | `pages/index-mission-control.html` | Project management |

---

## Theme System

Themes are controlled via CSS custom properties and JavaScript:

**Colors:** 10 accent colors (Black, Blue, Green, Orange, Yellow, Olive, Slate, Cyan, Purple, Rose)

**Modes:** Light and Dark

Theme preferences are saved to localStorage and applied on page load.

---

## Adding New Components

1. Create folder: `components/widgets/my-widget/`
2. Add template: `my-widget.html`
3. Add logic: `my-widget.js` (optional)
4. Import styles in `global.scss` (if needed)
5. Use in pages: `{{> widgets/my-widget/my-widget }}`

---

## SPA Navigation

Cleopatra uses client-side routing for smooth page transitions:

- No full page reloads
- Fade transitions between pages
- Browser history support
- Automatic component reinitialization
