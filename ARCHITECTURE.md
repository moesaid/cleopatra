# Architecture Rules

> **These rules are mandatory and must be followed for all changes.**

## Core Principles

1. **Pages = Routes** - `src/pages/` contains only page files (URLs)
2. **Widgets in Folders** - All widgets must be in their own folder
3. **Self-contained Components** - Each component has its own folder with html/js/scss

## Structure

```
src/
├── components/
│   ├── widgets/     # navbar, sidebar, charts, stats (each in folder)
│   ├── ui/          # dropdown, alert, button (each in folder)
│   ├── charts/      # analytics, sales, summary
│   ├── animations/  # view-transitions, scroll-reveal
│   └── layout/      # start.html, end.html, router.js
├── pages/           # ONLY route files (.html)
├── styles/          # tailwind.css, global.scss
├── assets/images/   # Static images
└── js/main.js       # Entry point
```

## Rules

| Rule | Example |
|------|---------|
| Every widget in a folder | `widgets/quick-info/quick-info.html` ✅ |
| No loose files in widgets | `widgets/quick-info.html` ❌ |
| Pages only have routes | `pages/index.html` ✅ |
| No partials in pages | `pages/partials/` ❌ |
| Layout wraps pages | `{{> start}}...{{> end}}` ✅ |

## Adding New Components

1. Create folder: `components/widgets/my-widget/`
2. Add files: `my-widget.html`, `my-widget.js`, `index.js`
3. Import styles in `global.scss` (if any)
4. Initialize in `main.js` (if needed)
5. Use in pages: `{{> my-widget/my-widget}}`
