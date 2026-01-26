/**
 * CRM Map Chart (Chart.js Bubble Chart as Geographic Visualization)
 * Theme-aware bubble chart representing customer locations
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryRGBA,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Customer location data - x/y as pseudo-geographic coordinates, r as bubble size (importance)
const locationData = [
    { x: 85, y: 30, r: 25, label: 'Australia', value: 48 },  // Australia
    { x: 70, y: 55, r: 18, label: 'Malaysia', value: 33 },   // Malaysia
    { x: 75, y: 50, r: 15, label: 'Indonesia', value: 25 },  // Indonesia
    { x: 72, y: 60, r: 12, label: 'Singapore', value: 17 },  // Singapore
    { x: 78, y: 65, r: 10, label: 'Philippines', value: 10 }, // Philippines
    // Secondary markets (smaller)
    { x: 20, y: 45, r: 6, label: 'USA', value: 5 },
    { x: 45, y: 55, r: 5, label: 'UK', value: 4 },
    { x: 50, y: 40, r: 4, label: 'Germany', value: 3 },
];

function getChartConfig() {
    const colors = getChartJsColors();

    return {
        type: 'bubble',
        data: {
            datasets: [{
                data: locationData,
                backgroundColor: getPrimaryRGBA(0.5),
                borderColor: getPrimaryRGBA(1),
                borderWidth: 2,
                hoverBackgroundColor: getPrimaryRGBA(0.7),
                hoverBorderColor: getPrimaryRGBA(1),
                hoverBorderWidth: 3,
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
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: {
                        label: (ctx) => {
                            const data = ctx.raw;
                            return `${data.label}: ${data.value}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    min: 0,
                    max: 100,
                },
                y: {
                    display: false,
                    min: 0,
                    max: 100,
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutElastic',
            }
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();

    chartInstance.data.datasets[0].backgroundColor = getPrimaryRGBA(0.5);
    chartInstance.data.datasets[0].borderColor = getPrimaryRGBA(1);
    chartInstance.data.datasets[0].hoverBackgroundColor = getPrimaryRGBA(0.7);
    chartInstance.data.datasets[0].hoverBorderColor = getPrimaryRGBA(1);

    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.update('none');
}

export function initCrmMapChart(staggerOffset = 0) {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartJsDeferred('crm-map-chart', (container) => {
        const ctx = container.getContext('2d');
        const chart = new Chart(ctx, getChartConfig());
        chartInstance = chart;
        return chart;
    }, {
        delay: 100,
        observeVisibility: true,
        staggerOffset: staggerOffset
    });

    themeObserver = observeThemeChanges(updateColors);
}
