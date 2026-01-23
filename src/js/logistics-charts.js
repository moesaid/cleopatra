/**
 * Logistics Dashboard Charts
 * ==============================================
 * Initializes charts for the Logistics Dashboard.
 */

import ApexCharts from 'apexcharts';

// ─────────────────────────────────────────────────────────────────────────────
// Data Layer (inline to avoid import issues)
// ─────────────────────────────────────────────────────────────────────────────
const logisticsDashboardData = {
    deliveryMetrics: {
        fleetUtilization: {
            chartData: [40, 65, 50, 80, 70, 95]
        },
        totalDeliveries: {
            chartData: [20, 35, 30, 45, 40, 60, 55, 75, 70, 90]
        }
    },
    revenueChart: {
        labels: ["Aug 05", "Aug 06", "Aug 07", "Aug 08", "Aug 09", "Aug 10", "Aug 11", "Aug 12", "Aug 13", "Aug 14", "Aug 15", "Aug 16"],
        datasets: [
            { name: "Revenue", data: [65, 72, 68, 85, 92, 88, 105, 115, 120, 118, 135, 142] },
            { name: "Costs", data: [45, 50, 48, 55, 60, 58, 65, 70, 75, 72, 80, 85] },
            { name: "Net Profit", data: [20, 22, 20, 30, 32, 30, 40, 45, 45, 46, 55, 57] }
        ]
    },
    cashBalance: {
        chartData: [
            { x: 'Mon', y: 35 },
            { x: 'Tue', y: 45 },
            { x: 'Wed', y: -15 },
            { x: 'Thu', y: 55 },
            { x: 'Fri', y: 60 },
            { x: 'Sat', y: -10 },
            { x: 'Sun', y: 40 }
        ]
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Theme Utilities
// ─────────────────────────────────────────────────────────────────────────────
function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark');
    const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    const primaryColor = primary ? `hsl(${primary})` : '#10b981';

    return {
        primary: primaryColor,
        text: isDark ? '#a1a1aa' : '#71717a',
        grid: isDark ? '#27272a' : '#e5e7eb',
        revenue: primaryColor,
        costs: '#f43f5e',
        profit: isDark ? '#ffffff' : '#18181b',
    };
}

let charts = {};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Fleet Utilization (Mini Bar Chart)
// ─────────────────────────────────────────────────────────────────────────────
function initUtilizationChart() {
    const el = document.getElementById('logistics-chart-utilization');
    if (!el || typeof ApexCharts === 'undefined') return;

    const colors = getChartColors();

    const options = {
        series: [{ data: logisticsDashboardData.deliveryMetrics.fleetUtilization.chartData }],
        chart: {
            type: 'bar',
            height: 48,
            sparkline: { enabled: true }
        },
        plotOptions: {
            bar: {
                columnWidth: '60%',
                borderRadius: 2
            }
        },
        colors: [colors.primary],
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: { title: { formatter: () => '' } },
            marker: { show: false }
        }
    };

    if (charts.utilization) charts.utilization.destroy();
    charts.utilization = new ApexCharts(el, options);
    charts.utilization.render();
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Total Deliveries (Smooth Sparkline)
// ─────────────────────────────────────────────────────────────────────────────
function initDeliveriesChart() {
    const el = document.getElementById('logistics-chart-deliveries');
    if (!el || typeof ApexCharts === 'undefined') return;

    const colors = getChartColors();

    const options = {
        series: [{ data: logisticsDashboardData.deliveryMetrics.totalDeliveries.chartData }],
        chart: {
            type: 'area',
            height: 48,
            sparkline: { enabled: true }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.3,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        },
        colors: [colors.primary],
        tooltip: {
            fixed: { enabled: false },
            x: { show: false },
            y: { title: { formatter: () => '' } },
            marker: { show: false }
        }
    };

    if (charts.deliveries) charts.deliveries.destroy();
    charts.deliveries = new ApexCharts(el, options);
    charts.deliveries.render();
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Revenue & Costs (Main Chart)
// ─────────────────────────────────────────────────────────────────────────────
function initRevenueChart() {
    const el = document.getElementById('logistics-revenue-chart');
    if (!el || typeof ApexCharts === 'undefined') return;

    const colors = getChartColors();
    const data = logisticsDashboardData.revenueChart;

    const options = {
        series: [
            { name: 'Revenue', data: data.datasets[0].data },
            { name: 'Costs', data: data.datasets[1].data },
            { name: 'Net Profit', data: data.datasets[2].data }
        ],
        chart: {
            type: 'line',
            height: 320,
            fontFamily: 'inherit',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: [colors.revenue, colors.costs, colors.profit],
        stroke: {
            width: [3, 3, 2],
            curve: 'smooth',
            dashArray: [0, 0, 0]
        },
        xaxis: {
            categories: data.labels,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: colors.text, fontSize: '12px' }
            }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text, fontSize: '12px' },
                formatter: (val) => `$${val}k`
            }
        },
        grid: {
            borderColor: colors.grid,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } },
            xaxis: { lines: { show: false } },
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
        },
        legend: { show: false },
        tooltip: {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            y: { formatter: (val) => `$${val}k` }
        }
    };

    if (charts.revenue) charts.revenue.destroy();
    charts.revenue = new ApexCharts(el, options);
    charts.revenue.render();
}

// Custom Legend Logic - expose to window
window.toggleLogisticsSeries = function (index) {
    if (charts.revenue) {
        charts.revenue.toggleSeries(['Revenue', 'Costs', 'Net Profit'][index]);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. Cash Balance (Mixed Bar Chart)
// ─────────────────────────────────────────────────────────────────────────────
function initBalanceChart() {
    const el = document.getElementById('logistics-chart-balance');
    if (!el || typeof ApexCharts === 'undefined') return;

    const colors = getChartColors();
    const data = logisticsDashboardData.cashBalance.chartData;

    const options = {
        series: [{
            name: 'Cash Flow',
            data: data
        }],
        chart: {
            type: 'bar',
            height: 160,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                colors: {
                    ranges: [{
                        from: -100,
                        to: 0,
                        color: colors.costs
                    }, {
                        from: 0,
                        to: 100,
                        color: colors.revenue
                    }]
                },
                columnWidth: '50%',
                borderRadius: 2
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            type: 'category',
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: colors.text, fontSize: '11px' } }
        },
        yaxis: { show: false },
        grid: {
            show: false,
            padding: { top: 0, right: 0, bottom: 0, left: 0 }
        },
        tooltip: {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
        }
    };

    if (charts.balance) charts.balance.destroy();
    charts.balance = new ApexCharts(el, options);
    charts.balance.render();
}

// ─────────────────────────────────────────────────────────────────────────────
// Lazy Loading Setup
// ─────────────────────────────────────────────────────────────────────────────

// Track which charts have been initialized
const initializedCharts = new Set();

// Chart configuration map for lazy loading
const chartConfig = {
    'logistics-chart-utilization': { init: initUtilizationChart, key: 'utilization' },
    'logistics-chart-deliveries': { init: initDeliveriesChart, key: 'deliveries' },
    'logistics-revenue-chart': { init: initRevenueChart, key: 'revenue' },
    'logistics-chart-balance': { init: initBalanceChart, key: 'balance' }
};

// Create IntersectionObserver for lazy loading
let lazyObserver = null;

function createLazyObserver() {
    if (lazyObserver) return lazyObserver;

    lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const elementId = entry.target.id;
                const config = chartConfig[elementId];

                if (config && !initializedCharts.has(elementId)) {
                    // Small delay to ensure smooth scrolling isn't interrupted
                    setTimeout(() => {
                        config.init();
                        initializedCharts.add(elementId);
                    }, 50);

                    // Stop observing this element
                    lazyObserver.unobserve(entry.target);
                }
            }
        });
    }, {
        root: null, // viewport
        rootMargin: '100px', // Start loading slightly before element is visible
        threshold: 0.1 // Trigger when 10% of element is visible
    });

    return lazyObserver;
}

// ─────────────────────────────────────────────────────────────────────────────
// Init Function
// ─────────────────────────────────────────────────────────────────────────────
export function initLogisticsCharts() {
    // Small delay to ensure DOM is fully ready and ApexCharts is loaded
    setTimeout(() => {
        const observer = createLazyObserver();

        // Observe all chart containers
        Object.keys(chartConfig).forEach((elementId) => {
            const el = document.getElementById(elementId);
            if (el) {
                // Reset initialized state for re-observation (useful for theme changes)
                if (!initializedCharts.has(elementId)) {
                    observer.observe(el);
                }
            }
        });
    }, 100);
}

// Force reinitialize all visible charts (used for theme changes)
function reinitializeVisibleCharts() {
    Object.entries(chartConfig).forEach(([elementId, config]) => {
        if (initializedCharts.has(elementId)) {
            config.init();
        }
    });
}

// Auto-reinit on theme change
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            setTimeout(() => reinitializeVisibleCharts(), 200);
        }
    });
});
themeObserver.observe(document.documentElement, { attributes: true });
