// ============================================
// Main Application Entry Point
// ============================================

// Styles
import '../styles/tailwind.css';
import '../styles/global.scss';

// PrismJS for code highlighting
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

Prism.plugins.NormalizeWhitespace.setDefaults({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
});

// Widgets
import { initNavbar } from '../components/widgets/navbar';
import { initSidebar } from '../components/widgets/sidebar';

// UI Components
import { initCodeCopy, reinitCodeCopy } from '../components/ui/code-block';
import '../components/ui/dropdown';
import '../components/ui/alert';

// Charts
import { initAnalytics1 } from '../components/charts/analytics';
import { initSalesOverview } from '../components/charts/sales-overview';
import { initSummary } from '../components/charts/summary';

// Router
import { initRouter } from '../components/layout/router';

// Expose for code transformer
window.reinitCodeCopy = reinitCodeCopy;

// Initialize components
function initComponents() {
    initNavbar();
    initSidebar();
    initCodeCopy();
    initAnalytics1();
    initSalesOverview();
    initSummary();
}

// Re-initialize on SPA navigation
document.addEventListener('page:load', initComponents);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    initComponents();
    initRouter();

    // Show app after CSS/JS fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Fallback if load already fired
    if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
    }
});
