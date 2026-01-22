# Cleopatra

Modern Admin Dashboard Template

![Dashboard](https://github.com/moesaid/cleopatra/raw/master/dist/img/index.png)

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

A clean, minimal admin dashboard built with **Tailwind CSS v4** and **Vite**. Component-first architecture with SPA-like navigation.

[Live Demo](https://moesaid.github.io/cleopatra/) · [Component Guide](COMPONENT_GUIDE.md)

---

## v2.0 - Complete Rewrite

### Architecture Changes

- **Next.js-like pages** - `pages/` folder contains only routes
- **Widget-based components** - Navbar, sidebar, charts are widgets
- **SPA navigation** - No page reloads, smooth transitions
- **Layout system** - Shared app shell with loading state

### New Structure

```
src/
├── components/
│   ├── widgets/     # Navbar, sidebar, charts, stat cards
│   ├── ui/          # Dropdown, alert, code-block, button
│   ├── charts/      # Analytics, sales, summary charts
│   ├── animations/  # View transitions, scroll reveal
│   └── layout/      # App shell, SPA router
├── pages/           # Route files only
├── styles/          # Tailwind + global styles
└── js/main.js       # Entry point
```

### Key Features

- Self-contained widgets
- SPA-like navigation (no flash)
- Minimal loading state
- Tree-shakeable imports

---

## Quick Start

```bash
git clone https://github.com/moesaid/cleopatra.git
cd cleopatra
npm install
npm run dev
```

Open `http://localhost:8081/`

---

## Creating Pages

Pages are simple route files:

```html
{{> start}}
<div class="bg-white p-6 rounded-md shadow">
  <h1>My Page</h1>
</div>
{{> end}}
```

The layout handles navbar, sidebar, and loading automatically.

---

## Tech Stack

- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **Handlebars** - Templates
- **ApexCharts / Chart.js** - Charts
- **PrismJS** - Code highlighting

---

## License

MIT © [Mohamed Said](https://moesaid.com)
