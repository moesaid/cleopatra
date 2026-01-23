/**
 * Revenue Chart Widget
 * Uses deferred lazy loading to fix initial sizing issues
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors } from '../chart-utils.js';

// Chart data
const revenueData = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [18000, 24000, 16000, 35000, 28000, 42000, 30000, 36000, 22000, 40000, 45000, 52000]
};

let chartInstance = null;
let themeObserver = null;

// Build chart options
function getChartOptions(width) {
    const colors = getThemeColors();

    return {
        chart: {
            type: 'bar',
            height: 320,
            width: width || '100%',
            toolbar: { show: false },
            fontFamily: 'Inter, system-ui, sans-serif',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 600,
            },
            redrawOnParentResize: true,
            redrawOnWindowResize: true
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: '55%',
            }
        },
        dataLabels: { enabled: false },
        series: [{ name: 'Revenue', data: revenueData.values }],
        colors: [colors.primary],
        states: {
            hover: { filter: { type: 'darken', value: 0.1 } },
        },
        xaxis: {
            categories: revenueData.months,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { style: { colors: colors.text, fontSize: '12px' } }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text, fontSize: '12px' },
                formatter: (val) => '$' + (val / 1000).toFixed(0) + 'K'
            }
        },
        grid: {
            borderColor: colors.grid,
            strokeDashArray: 4,
            xaxis: { lines: { show: false } }
        },
        tooltip: {
            enabled: true,
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            y: { formatter: (val) => '$' + val.toLocaleString() },
        },
        responsive: [{
            breakpoint: 640,
            options: {
                chart: { height: 260 },
                plotOptions: { bar: { columnWidth: '70%' } },
                xaxis: { labels: { rotate: -45, style: { fontSize: '10px' } } }
            }
        }]
    };
}

function updateChartColors() {
    if (!chartInstance) return;
    const colors = getThemeColors();
    chartInstance.updateOptions({
        colors: [colors.primary],
        xaxis: { labels: { style: { colors: colors.text } } },
        yaxis: { labels: { style: { colors: colors.text } } },
        grid: { borderColor: colors.grid },
        tooltip: { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }
    }, false, false);
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.revenue-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active', 'bg-card', 'text-foreground', 'shadow-sm');
                b.classList.add('text-muted-foreground');
            });
            btn.classList.add('active', 'bg-card', 'text-foreground', 'shadow-sm');
            btn.classList.remove('text-muted-foreground');
        });
    });
}

export function initRevenueChart() {
    // Cleanup previous instances
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartDeferred('revenue-chart', (container, width) => {
        const chart = new ApexCharts(container, getChartOptions(width));
        chart.render();
        chartInstance = chart;
        return chart;
    }, {
        delay: 150,
        observeVisibility: true,
        onResize: (chart, width) => {
            chart.updateOptions({ chart: { width } }, false, false);
        }
    });

    setupTabs();
    themeObserver = setupThemeObserver(updateChartColors);
}
