/**
 * CRM Retention Chart (Chart.js Stacked Bar)
 * Theme-aware stacked bar chart with primary color shades - no border radius
 */

import {
    Chart,
    getChartJsColors,
    getPrimaryRGBA,
    barStaggerAnimation,
    observeThemeChanges,
    initChartJsDeferred
} from '../chartjs-utils.js';

let chartInstance = null;
let themeObserver = null;

// Retention data by month
const retentionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    smes: [40, 35, 50, 45, 35, 40, 55, 45, 60],
    startups: [30, 40, 30, 35, 50, 30, 40, 50, 40],
    enterprises: [25, 30, 25, 35, 25, 40, 35, 45, 35],
};

function getChartConfig() {
    const colors = getChartJsColors();

    return {
        type: 'bar',
        data: {
            labels: retentionData.labels,
            datasets: [
                {
                    label: 'SMEs',
                    data: retentionData.smes,
                    backgroundColor: getPrimaryRGBA(0.3), // lightest shade
                },
                {
                    label: 'Startups',
                    data: retentionData.startups,
                    backgroundColor: getPrimaryRGBA(0.6), // medium shade
                },
                {
                    label: 'Enterprises',
                    data: retentionData.enterprises,
                    backgroundColor: getPrimaryRGBA(1), // full primary
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
                    cornerRadius: 4,
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: colors.text, font: { size: 9 } },
                    border: { display: false }
                },
                y: {
                    stacked: true,
                    display: false,
                    grid: { display: false },
                }
            },
            ...barStaggerAnimation
        }
    };
}

function updateColors() {
    if (!chartInstance) return;

    const colors = getChartJsColors();

    // Update bar colors with primary RGBA shades
    chartInstance.data.datasets[0].backgroundColor = getPrimaryRGBA(0.3);
    chartInstance.data.datasets[1].backgroundColor = getPrimaryRGBA(0.6);
    chartInstance.data.datasets[2].backgroundColor = getPrimaryRGBA(1);

    chartInstance.options.plugins.tooltip.backgroundColor = colors.background;
    chartInstance.options.plugins.tooltip.titleColor = colors.text;
    chartInstance.options.plugins.tooltip.bodyColor = colors.text;
    chartInstance.options.plugins.tooltip.borderColor = colors.grid;

    chartInstance.options.scales.x.ticks.color = colors.text;

    chartInstance.update('none');
}

export function initCrmRetentionChart(staggerOffset = 0) {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartJsDeferred('crm-retention-chart', (container) => {
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
