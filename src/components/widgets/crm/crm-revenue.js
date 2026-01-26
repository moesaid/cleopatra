/**
 * CRM Revenue Chart (Chart.js Line/Area)
 * Theme-aware revenue chart with primary color
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryRGBA,
    getShadeWithAlpha,
    lineDrawingAnimation,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Revenue data (monthly)
const revenueData = {
    labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    values: [18000, 22000, 19000, 28000, 32000, 35000, 31000, 34000, 28000, 30000, 25000, 27000, 32000],
};

function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, getPrimaryRGBA(0.4));
    gradient.addColorStop(1, getPrimaryRGBA(0.02));
    return gradient;
}

function getChartConfig(ctx) {
    const colors = getChartJsColors();

    return {
        type: 'line',
        data: {
            labels: revenueData.labels,
            datasets: [{
                data: revenueData.values,
                borderColor: getPrimaryRGBA(1),
                backgroundColor: createGradient(ctx),
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: getPrimaryRGBA(1),
                pointHoverBorderColor: colors.background,
                pointHoverBorderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: colors.background,
                    titleColor: colors.text,
                    bodyColor: colors.text,
                    borderColor: colors.grid,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: (ctx) => `$${ctx.parsed.y.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text, font: { size: 10 } },
                    border: { display: false }
                },
                y: {
                    grid: { color: colors.grid, drawBorder: false },
                    ticks: {
                        color: colors.text,
                        font: { size: 10 },
                        callback: (val) => val >= 1000 ? `${val / 1000}k` : val
                    },
                    border: { display: false },
                    min: 10000,
                    max: 40000
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            ...lineDrawingAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();
    const ctx = chartInstance.ctx;

    chartInstance.data.datasets[0].borderColor = getPrimaryRGBA(1);
    chartInstance.data.datasets[0].backgroundColor = createGradient(ctx);
    chartInstance.data.datasets[0].pointHoverBackgroundColor = getPrimaryRGBA(1);
    chartInstance.data.datasets[0].pointHoverBorderColor = colors.background;

    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.options.scales.x.ticks.color = colors.text;
    chartInstance.options.scales.y.ticks.color = colors.text;
    chartInstance.options.scales.y.grid.color = colors.grid;

    chartInstance.update('none');
}

export function initCrmRevenueChart(staggerOffset = 0) {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartJsDeferred('crm-revenue-chart', (container) => {
        const ctx = container.getContext('2d');
        const chart = new Chart(ctx, getChartConfig(ctx));
        chartInstance = chart;
        return chart;
    }, {
        delay: 100,
        observeVisibility: true,
        staggerOffset: staggerOffset
    });

    themeObserver = observeThemeChanges(updateColors);
}
