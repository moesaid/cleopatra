/**
 * Sales Distribution Chart (Chart.js Doughnut)
 * Animated doughnut chart with radial sweep and lazy loading
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryColorShades,
    doughnutSweepAnimation,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Sample data
const distributionData = {
    labels: ['Direct', 'Organic', 'Referral', 'Social'],
    values: [35, 28, 22, 15],
};

function getChartConfig() {
    const colors = getChartJsColors();
    const dataColors = getPrimaryColorShades();

    return {
        type: 'doughnut',
        data: {
            labels: distributionData.labels,
            datasets: [{
                data: distributionData.values,
                backgroundColor: dataColors,
                borderColor: colors.background,
                borderWidth: 3,
                hoverBorderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        useBorderRadius: true,
                        borderRadius: 2,
                        padding: 16,
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
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            // Radial sweep animation with elastic bounce
            ...doughnutSweepAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();
    const dataColors = getPrimaryColorShades();

    chartInstance.data.datasets[0].backgroundColor = dataColors;
    chartInstance.data.datasets[0].borderColor = colors.background;
    chartInstance.options.plugins.legend.labels.color = colors.text;
    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.update('none');
}

export function initDistributionChart(staggerOffset = 0) {
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
    initChartJsDeferred('distribution-chart-js', (container) => {
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
