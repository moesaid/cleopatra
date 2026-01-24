/**
 * Country Stats Chart (Chart.js Doughnut)
 * Animated doughnut chart for customer by country distribution
 */

import {
    Chart,
    getChartJsColors,
    doughnutSweepAnimation,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Sample data
const countryData = {
    labels: ['Russia', 'USA', 'UAE'],
    values: [54, 28, 18],
};

// Country colors
const countryColors = [
    '#f59e0b', // amber for Russia
    '#22c55e', // green for USA
    '#86efac', // light green for UAE
];

function getChartConfig() {
    const colors = getChartJsColors();

    return {
        type: 'doughnut',
        data: {
            labels: countryData.labels,
            datasets: [{
                data: countryData.values,
                backgroundColor: countryColors,
                borderColor: colors.background,
                borderWidth: 3,
                hoverBorderWidth: 0,
                hoverOffset: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    backgroundColor: colors.background,
                    titleColor: colors.text,
                    bodyColor: colors.text,
                    borderColor: colors.grid,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            // Radial sweep animation
            ...doughnutSweepAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();

    chartInstance.data.datasets[0].borderColor = colors.background;
    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.update('none');
}

export function initCountryStatsChart(staggerOffset = 0) {
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
    initChartJsDeferred('country-stats-chart', (container) => {
        const ctx = container.getContext('2d');
        const chart = new Chart(ctx, getChartConfig());
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
