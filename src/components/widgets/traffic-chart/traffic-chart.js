/**
 * Traffic Chart Widget (Chart.js)
 * Animated line chart with "drawing" effect and lazy loading
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryColorShades,
    lineDrawingAnimation,
    getDefaultScales,
    createGradient,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Sample data
const trafficData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    visitors: [2400, 3200, 2800, 4200, 3800, 5100, 4600],
    pageviews: [4800, 6400, 5600, 8400, 7600, 10200, 9200]
};

function getChartConfig(ctx) {
    const colors = getChartJsColors();
    const shades = getPrimaryColorShades();

    // Create gradient using primary color shades
    let gradient;
    try {
        gradient = createGradient(ctx, shades[0] + '40', shades[0] + '00');
    } catch (e) {
        gradient = 'transparent';
    }

    return {
        type: 'line',
        data: {
            labels: trafficData.labels,
            datasets: [
                {
                    label: 'Visitors',
                    data: trafficData.visitors,
                    borderColor: colors.primary,
                    backgroundColor: gradient,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: colors.primary,
                    pointHoverBorderColor: colors.background,
                    pointHoverBorderWidth: 2,
                },
                {
                    label: 'Page Views',
                    data: trafficData.pageviews,
                    borderColor: shades[2],
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: shades[2],
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        useBorderRadius: true,
                        borderRadius: 2,
                        color: colors.text,
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: colors.background,
                    titleColor: colors.text,
                    bodyColor: colors.text,
                    borderColor: colors.grid,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 4
                }
            },
            scales: getDefaultScales(colors),
            // Line "drawing" animation - reveals from left to right
            ...lineDrawingAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const container = document.getElementById('traffic-chart-js');
    if (!container) return;

    const ctx = container.getContext('2d');
    const colors = getChartJsColors();
    const shades = getPrimaryColorShades();

    let gradient;
    try {
        gradient = createGradient(ctx, shades[0] + '40', shades[0] + '00');
    } catch (e) {
        gradient = 'transparent';
    }

    chartInstance.data.datasets[0].borderColor = colors.primary;
    chartInstance.data.datasets[0].backgroundColor = gradient;
    chartInstance.data.datasets[0].pointHoverBackgroundColor = colors.primary;
    chartInstance.data.datasets[0].pointHoverBorderColor = colors.background;
    chartInstance.data.datasets[1].borderColor = shades[2];
    chartInstance.data.datasets[1].pointHoverBackgroundColor = shades[2];

    chartInstance.options.plugins.legend.labels.color = colors.text;
    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.options.scales.x.ticks.color = colors.text;
    chartInstance.options.scales.y.ticks.color = colors.text;
    chartInstance.options.scales.y.grid.color = colors.grid;

    chartInstance.update('none');
}

export function initTrafficChart(staggerOffset = 0) {
    // Cleanup previous instances
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    // Use deferred lazy loading with IntersectionObserver
    initChartJsDeferred('traffic-chart-js', (container) => {
        const ctx = container.getContext('2d');
        const chart = new Chart(ctx, getChartConfig(ctx));
        chartInstance = chart;
        return chart;
    }, {
        delay: 100,
        observeVisibility: true,
        staggerOffset: staggerOffset
    });

    // Theme observer
    themeObserver = observeThemeChanges(updateColors);
}
