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
import { initCodeBlockTransformer } from '../components/ui/code-block/code-block-transformer.js';
import { initAccordion } from '../components/ui/accordion';
import { initCheckbox } from '../components/ui/checkbox';
import { initCollapse } from '../components/ui/collapse';
import { initDropdown } from '../components/ui/dropdown/dropdown.js';
import { initModal } from '../components/ui/modal/modal.js';
import { initTabs } from '../components/ui/tabs/tabs.js';
import { initDrawer } from '../components/ui/drawer/drawer.js';
import { initExampleBlocks } from '../components/ui/example-block/example-block.js';
import '../components/ui/toast/toast.js';
import '../components/ui/alert';

// Charts
import { initAnalytics1 } from '../components/charts/analytics';
import { initSalesOverview } from '../components/charts/sales-overview';
import { initSummary } from '../components/charts/summary';

// Router
import { initRouter } from '../components/layout/router';

// Expose for code transformer
window.reinitCodeCopy = reinitCodeCopy;
// Expose Prism globally for SPA navigation
window.Prism = Prism;

// Initialize components
function initComponents() {
    initNavbar();
    initSidebar();
    initCodeCopy();
    initAccordion();
    initCheckbox();
    initCollapse();
    initDropdown();
    initModal();
    initTabs();
    initDrawer();
    initExampleBlocks();
    initAnalytics1();
    initSalesOverview();
    initSummary();
}

// Re-initialize on SPA navigation (including code highlighting)
document.addEventListener('page:load', () => {
    initComponents();
    // Re-run code block transformer for new content
    initCodeBlockTransformer();
    // Re-highlight all code blocks with Prism
    Prism.highlightAll();
});

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
