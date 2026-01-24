/**
 * Inventory Stock Movement Chart (Chart.js)
 * Theme-aware line chart with dynamic primary colors
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryRGBA,
    lineDrawingAnimation,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Stock movement data
const stockData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    arrivals: [450, 620, 380, 520],
    sales: [380, 520, 450, 480],
};

function createGradient(ctx, alpha) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
    gradient.addColorStop(0, getPrimaryRGBA(alpha));
    gradient.addColorStop(1, getPrimaryRGBA(0.02));
    return gradient;
}

function getChartConfig(ctx) {
    const colors = getChartJsColors();

    return {
        type: 'line',
        data: {
            labels: stockData.labels,
            datasets: [
                {
                    label: 'Arrivals',
                    data: stockData.arrivals,
                    borderColor: getPrimaryRGBA(1),
                    backgroundColor: createGradient(ctx, 0.3),
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: getPrimaryRGBA(1),
                    pointBorderColor: colors.background,
                    pointBorderWidth: 2,
                },
                {
                    label: 'Sales',
                    data: stockData.sales,
                    borderColor: getPrimaryRGBA(0.4),
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: getPrimaryRGBA(0.4),
                    pointBorderColor: colors.background,
                    pointBorderWidth: 2,
                }
            ]
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
                    padding: 10,
                    cornerRadius: 8,
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: colors.text, font: { size: 10 } },
                    border: { display: false }
                },
                y: {
                    grid: { color: colors.grid },
                    ticks: { color: colors.text, font: { size: 10 } },
                    border: { display: false }
                }
            },
            ...lineDrawingAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();
    const ctx = chartInstance.ctx;

    // Update arrivals line
    chartInstance.data.datasets[0].borderColor = getPrimaryRGBA(1);
    chartInstance.data.datasets[0].backgroundColor = createGradient(ctx, 0.3);
    chartInstance.data.datasets[0].pointBackgroundColor = getPrimaryRGBA(1);
    chartInstance.data.datasets[0].pointBorderColor = colors.background;

    // Update sales line
    chartInstance.data.datasets[1].borderColor = getPrimaryRGBA(0.4);
    chartInstance.data.datasets[1].pointBackgroundColor = getPrimaryRGBA(0.4);
    chartInstance.data.datasets[1].pointBorderColor = colors.background;

    // Update tooltip and scales
    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.options.scales.x.ticks.color = colors.text;
    chartInstance.options.scales.y.ticks.color = colors.text;
    chartInstance.options.scales.y.grid.color = colors.grid;

    chartInstance.update('none');
}

export function initInventoryChart(staggerOffset = 0) {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartJsDeferred('inventory-chart', (container) => {
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
