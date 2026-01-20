import { initAnalytics1 } from './analytics_1.js';
import { initSalesOverview } from './salesOverview.js';
import { initSummary } from './summary.js';

export function initCharts() {
    initAnalytics1();
    initSalesOverview();
    initSummary();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
} else {
    initCharts();
}
