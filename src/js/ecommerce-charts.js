/**
 * E-commerce Dashboard Charts
 * ==============================================
 * Uses deferred lazy loading from chart-utils.js to fix sizing issues.
 * Charts wait for container dimensions before rendering.
 * All charts use the primary color from CSS custom properties.
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors, getPrimaryColor } from '../components/widgets/chart-utils.js';

// ─────────────────────────────────────────────────────────────────────────────
// Data Layer
// ─────────────────────────────────────────────────────────────────────────────
const ecommerceDashboardData = {
    metrics: {
        revenue: { chartData: [28, 35, 42, 38, 52, 48, 62, 58, 72, 68, 85, 92] },
        orders: { chartData: [120, 145, 160, 155, 180, 175, 210, 195, 240, 225, 280, 310] },
        customers: { chartData: [450, 520, 580, 620, 750, 820, 890, 980, 1100, 1250, 1400, 1580] }
    },
    salesChart: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            { name: "This Period", data: [28, 35, 42, 38, 52, 48, 62, 75, 72, 85, 92, 128] },
            { name: "Last Period", data: [22, 28, 35, 32, 42, 38, 48, 55, 58, 68, 75, 95] }
        ]
    },
    categories: [
        { name: 'Electronics', value: 42580 },
        { name: 'Fashion', value: 35290 },
        { name: 'Home & Garden', value: 28140 },
        { name: 'Sports', value: 22420 }
    ]
};

// ─────────────────────────────────────────────────────────────────────────────
// Color Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get card background color based on theme
 */
function getCardColor() {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? '#1c1c1e' : '#ffffff';
}

/**
 * Get primary color as RGB by creating a hidden element
 */
function getPrimaryRGB() {
    const testEl = document.createElement('div');
    testEl.style.cssText = 'position:absolute;visibility:hidden;background-color:var(--primary)';
    document.body.appendChild(testEl);
    const computedColor = getComputedStyle(testEl).backgroundColor;
    document.body.removeChild(testEl);

    const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
    return { r: 59, g: 130, b: 246 };
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Generate primary color shades for category chart
 * Handles both colorful and grayscale (neutral) themes
 */
function getPrimaryShades() {
    const rgb = getPrimaryRGB();
    const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const isDark = document.documentElement.classList.contains('dark');

    // Check if this is a grayscale/neutral color (saturation < 5%)
    const isGrayscale = s < 5;

    if (isGrayscale) {
        // For neutral/grayscale themes, generate distinct lightness shades
        if (isDark) {
            return [
                `hsl(0, 0%, ${l}%)`,
                `hsl(0, 0%, ${Math.max(l - 12, 15)}%)`,
                `hsl(0, 0%, ${Math.max(l - 24, 10)}%)`,
                `hsl(0, 0%, ${Math.max(l - 36, 5)}%)`
            ];
        } else {
            return [
                `hsl(0, 0%, ${l}%)`,
                `hsl(0, 0%, ${Math.min(l + 15, 70)}%)`,
                `hsl(0, 0%, ${Math.min(l + 30, 80)}%)`,
                `hsl(0, 0%, ${Math.min(l + 45, 90)}%)`
            ];
        }
    }

    // For colorful themes, vary saturation and lightness
    if (isDark) {
        return [
            `hsl(${h}, ${s}%, ${l}%)`,
            `hsl(${h}, ${Math.max(s - 10, 20)}%, ${Math.max(l - 10, 25)}%)`,
            `hsl(${h}, ${Math.max(s - 20, 15)}%, ${Math.max(l - 20, 20)}%)`,
            `hsl(${h}, ${Math.max(s - 30, 10)}%, ${Math.max(l - 30, 15)}%)`
        ];
    } else {
        return [
            `hsl(${h}, ${s}%, ${l}%)`,
            `hsl(${h}, ${Math.max(s - 10, 30)}%, ${Math.min(l + 12, 65)}%)`,
            `hsl(${h}, ${Math.max(s - 20, 20)}%, ${Math.min(l + 24, 75)}%)`,
            `hsl(${h}, ${Math.max(s - 30, 15)}%, ${Math.min(l + 36, 85)}%)`
        ];
    }
}

// Chart instances for theme updates
let charts = {
    revenue: null,
    orders: null,
    customers: null,
    sales: null,
    category: null
};

let themeObserver = null;

// ─────────────────────────────────────────────────────────────────────────────
// Chart Options Builders
// ─────────────────────────────────────────────────────────────────────────────

function getSparklineOptions(data, type = 'area', formatter = (val) => val) {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');

    const baseOptions = {
        series: [{ data }],
        chart: {
            type,
            height: 48,
            sparkline: { enabled: true },
            animations: { enabled: true, speed: 300 }
        },
        colors: [colors.primary],
        tooltip: {
            enabled: true,
            theme: isDark ? 'dark' : 'light',
            y: { formatter }
        }
    };

    if (type === 'area') {
        baseOptions.stroke = { curve: 'smooth', width: 2 };
        baseOptions.fill = {
            type: 'gradient',
            gradient: {
                shade: isDark ? 'dark' : 'light',
                type: 'vertical',
                gradientToColors: [getCardColor()],
                opacityFrom: 0.5,
                opacityTo: 0.05,
                stops: [0, 100]
            }
        };
    } else if (type === 'bar') {
        baseOptions.plotOptions = { bar: { columnWidth: '50%', borderRadius: 2 } };
    }

    return baseOptions;
}

function getSalesChartOptions(width) {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');
    const data = ecommerceDashboardData.salesChart;

    return {
        series: [
            { name: 'This Period', data: data.datasets[0].data },
            { name: 'Last Period', data: data.datasets[1].data }
        ],
        chart: {
            type: 'area',
            height: 288,
            width: width || '100%',
            toolbar: { show: false },
            zoom: { enabled: false },
            animations: { enabled: true, speed: 400 },
            redrawOnParentResize: true,
            redrawOnWindowResize: true
        },
        colors: [colors.primary, colors.muted],
        stroke: { width: [2, 2], curve: 'smooth', dashArray: [0, 5] },
        fill: {
            type: ['gradient', 'solid'],
            gradient: {
                shade: isDark ? 'dark' : 'light',
                type: 'vertical',
                gradientToColors: [getCardColor()],
                opacityFrom: 0.4,
                opacityTo: 0.05,
                stops: [0, 100]
            },
            opacity: [1, 0]
        },
        xaxis: {
            categories: data.labels,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: colors.text, fontSize: '11px' } }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text, fontSize: '11px' },
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
        tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (val) => `$${val}k` } },
        dataLabels: { enabled: false }
    };
}

function getCategoryChartOptions(width) {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');
    const categories = ecommerceDashboardData.categories;
    const chartColors = getPrimaryShades();

    return {
        series: categories.map(c => c.value),
        chart: {
            type: 'donut',
            height: 192,
            width: width || '100%',
            animations: { enabled: true, speed: 300 },
            redrawOnParentResize: true,
            redrawOnWindowResize: true
        },
        labels: categories.map(c => c.name),
        colors: chartColors,
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: { show: true, fontSize: '12px', color: colors.text },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontWeight: 700,
                            color: colors.foreground,
                            formatter: (val) => `$${(val / 1000).toFixed(1)}k`
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '11px',
                            color: colors.text,
                            formatter: (w) => {
                                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return `$${(total / 1000).toFixed(1)}k`;
                            }
                        }
                    }
                }
            }
        },
        legend: { show: false },
        dataLabels: { enabled: false },
        stroke: { width: 2, colors: [getCardColor()] },
        tooltip: {
            theme: isDark ? 'dark' : 'light',
            y: { formatter: (val) => `$${(val / 1000).toFixed(1)}k` }
        }
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme Update Handler
// ─────────────────────────────────────────────────────────────────────────────

function updateAllChartColors() {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');
    const chartColors = getPrimaryShades();

    // Update sparklines
    ['revenue', 'orders', 'customers'].forEach(key => {
        if (charts[key]) {
            charts[key].updateOptions({
                colors: [colors.primary],
                tooltip: { theme: isDark ? 'dark' : 'light' }
            }, false, false);
        }
    });

    // Update sales chart
    if (charts.sales) {
        charts.sales.updateOptions({
            colors: [colors.primary, colors.muted],
            xaxis: { labels: { style: { colors: colors.text } } },
            yaxis: { labels: { style: { colors: colors.text } } },
            grid: { borderColor: colors.grid },
            tooltip: { theme: isDark ? 'dark' : 'light' }
        }, false, false);
    }

    // Update category chart with new shades
    if (charts.category) {
        charts.category.updateOptions({
            colors: chartColors,
            stroke: { colors: [getCardColor()] },
            tooltip: { theme: isDark ? 'dark' : 'light' }
        }, false, false);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle Series (exposed to window)
// ─────────────────────────────────────────────────────────────────────────────
window.toggleSalesSeries = function (index) {
    if (charts.sales) {
        charts.sales.toggleSeries(['This Period', 'Last Period'][index]);
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Init Function - Uses initChartDeferred for proper lazy loading
// ─────────────────────────────────────────────────────────────────────────────
export function initEcommerceCharts() {
    // Cleanup previous observer
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    // Revenue Sparkline
    initChartDeferred('ecommerce-chart-revenue', (container) => {
        const chart = new ApexCharts(container, getSparklineOptions(
            ecommerceDashboardData.metrics.revenue.chartData,
            'area',
            (val) => `$${val}k`
        ));
        chart.render();
        charts.revenue = chart;
        return chart;
    }, { delay: 100, observeVisibility: true });

    // Orders Sparkline
    initChartDeferred('ecommerce-chart-orders', (container) => {
        const chart = new ApexCharts(container, getSparklineOptions(
            ecommerceDashboardData.metrics.orders.chartData,
            'bar',
            (val) => `${val} orders`
        ));
        chart.render();
        charts.orders = chart;
        return chart;
    }, { delay: 100, observeVisibility: true });

    // Customers Sparkline
    initChartDeferred('ecommerce-chart-customers', (container) => {
        const chart = new ApexCharts(container, getSparklineOptions(
            ecommerceDashboardData.metrics.customers.chartData,
            'area',
            (val) => `${val} customers`
        ));
        chart.render();
        charts.customers = chart;
        return chart;
    }, { delay: 100, observeVisibility: true });

    // Sales Overview Chart
    initChartDeferred('ecommerce-sales-chart', (container, width) => {
        const chart = new ApexCharts(container, getSalesChartOptions(width));
        chart.render();
        charts.sales = chart;
        return chart;
    }, {
        delay: 150,
        observeVisibility: true,
        onResize: (chart, width) => {
            chart.updateOptions({ chart: { width } }, false, false);
        }
    });

    // Category Donut Chart
    initChartDeferred('ecommerce-category-chart', (container, width) => {
        const chart = new ApexCharts(container, getCategoryChartOptions(width));
        chart.render();
        charts.category = chart;
        return chart;
    }, {
        delay: 150,
        observeVisibility: true,
        onResize: (chart, width) => {
            chart.updateOptions({ chart: { width } }, false, false);
        }
    });

    // Setup theme observer for color updates
    themeObserver = setupThemeObserver(updateAllChartColors);
}
