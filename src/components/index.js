// ============================================
// Cleopatra Component Registry
// ============================================
// Import only what you need for optimal bundle size

// Widgets
export { initNavbar } from './widgets/navbar';
export { initSidebar } from './widgets/sidebar';
export { num, numArr, initNumbers } from './widgets/numbers';

// UI Components
export { initCodeCopy, reinitCodeCopy } from './ui/code-block';
export { initExampleBlocks } from './ui/example-block';

// Charts
export { initAnalytics1 as AnalyticsChart } from './charts/analytics';
export { initSalesOverview as SalesOverviewChart } from './charts/sales-overview';
export { initSummary as SummaryChart } from './charts/summary';
export { getChartOptions } from './charts/utils';

// Layout
export { initRouter } from './layout/router';

// Animations
export { initViewTransitions } from './animations/view-transitions';
export { initScrollReveal } from './animations/scroll-reveal';
