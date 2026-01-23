/**
 * Monthly Goal Widget - Radial Progress Chart
 * Uses deferred lazy loading to fix initial sizing issues
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors } from '../chart-utils.js';

let goalChart = null;
let themeObserver = null;

function getChartOptions() {
    const colors = getThemeColors();
    const targetPercentage = 75;

    return {
        series: [targetPercentage],
        chart: {
            type: 'radialBar',
            height: 200,
            width: '100%',
            sparkline: { enabled: true },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1000,
            },
            redrawOnParentResize: true,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                hollow: {
                    margin: 0,
                    size: '70%',
                    background: 'transparent',
                },
                track: {
                    background: colors.track,
                    strokeWidth: '100%',
                    margin: 0,
                },
                dataLabels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '12px',
                        fontFamily: 'inherit',
                        fontWeight: 400,
                        color: colors.muted,
                        offsetY: 25
                    },
                    value: {
                        show: true,
                        fontSize: '32px',
                        fontFamily: 'inherit',
                        fontWeight: 700,
                        color: colors.foreground,
                        offsetY: -10,
                        formatter: (val) => val + '%'
                    }
                }
            }
        },
        fill: {
            type: 'solid',
            colors: [colors.primary]
        },
        stroke: { lineCap: 'round' },
        labels: ['completed'],
        colors: [colors.primary],
    };
}

function updateChartColors() {
    if (!goalChart) return;
    const colors = getThemeColors();
    goalChart.updateOptions({
        colors: [colors.primary],
        fill: { colors: [colors.primary] },
        plotOptions: {
            radialBar: {
                track: { background: colors.track },
                dataLabels: {
                    name: { color: colors.muted },
                    value: { color: colors.foreground }
                }
            }
        },
    }, false, false);
}

function setupHoverEffects(container) {
    const wrapper = container.closest('.monthly-goal-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('mouseenter', () => {
        container.style.transform = 'scale(1.02)';
        container.style.transition = 'transform 0.3s ease';
    });
    wrapper.addEventListener('mouseleave', () => {
        container.style.transform = 'scale(1)';
    });
}

export function initMonthlyGoal() {
    // Cleanup
    if (goalChart) {
        goalChart.destroy();
        goalChart = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartDeferred('monthly-goal-chart', (container) => {
        const chart = new ApexCharts(container, getChartOptions());
        chart.render();
        goalChart = chart;
        setupHoverEffects(container);
        return chart;
    }, {
        delay: 150,
        observeVisibility: true,
    });

    themeObserver = setupThemeObserver(updateChartColors);
}
