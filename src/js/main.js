// ============================================
// Main Application Entry Point
// ============================================

// Styles
import '../styles/tailwind.css';
import '../styles/global.scss';

// Syntax highlighting is now handled by Shiki in code-block-transformer.js

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

// Dashboard Widgets
import { initMetricsRow } from '../components/widgets/metrics-row/metrics-row.js';
import { initRevenueChart } from '../components/widgets/revenue-chart/revenue-chart.js';
import { initMonthlyGoal } from '../components/widgets/monthly-goal/monthly-goal.js';

// Router
import { initRouter } from '../components/layout/router';

// Expose for code transformer
window.reinitCodeCopy = reinitCodeCopy;


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

    // Dashboard widgets
    initMetricsRow();
    initRevenueChart();
    initMonthlyGoal();
}

// Re-initialize on SPA navigation (including code highlighting)
document.addEventListener('page:load', () => {
    initComponents();
    // Re-run code block transformer for new content
    initCodeBlockTransformer();

});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    initComponents();
    initRouter();
    // Transform code blocks and apply Prism highlighting on initial load
    initCodeBlockTransformer();

    // Show app after CSS/JS fully loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Fallback if load already fired
    if (document.readyState === 'complete') {
        document.body.classList.add('loaded');
    }
});
