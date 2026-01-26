/**
 * Metrics Row Widget - Sparkline Charts
 * Uses deferred lazy loading to fix initial sizing issues
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors } from '../chart-utils.js';

// Store chart instances
const chartInstances = new Map();
let themeObserver = null;

function getSparklineOptions(data, colorOverride = null, width, delayOffset = 0) {
    const colors = getThemeColors();
    const chartColor = colorOverride || colors.primary;
    const isDark = document.documentElement.classList.contains('dark');

    return {
        chart: {
            type: 'area',
            height: 40,
            width: width || '100%',
            sparkline: { enabled: true },
            animations: {
                enabled: true,
                easing: 'easeout',
                speed: 900,
                animateGradually: {
                    enabled: true,
                    delay: 50 + delayOffset  // Wave effect with stagger
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            redrawOnParentResize: true,
        },
        series: [{ data }],
        stroke: { width: 2, curve: 'smooth' },
        colors: [chartColor],
        fill: {
            type: 'gradient',
            gradient: {
                shade: isDark ? 'dark' : 'light',
                type: 'vertical',
                shadeIntensity: 0,
                gradientToColors: [chartColor],
                opacityFrom: isDark ? 0.25 : 0.15,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        tooltip: {
            enabled: true,
            theme: isDark ? 'dark' : 'light',
            x: { show: false },
            y: { formatter: (val) => '$' + val.toLocaleString() }
        }
    };
}

function createSparkline(elementId, data, colorOverride = null, skipThemeUpdate = false) {
    initChartDeferred(elementId, (container, width) => {
        const chart = new ApexCharts(container, getSparklineOptions(data, colorOverride, width));
        chart.render();
        chartInstances.set(elementId, { chart, data, colorOverride, skipThemeUpdate });
        return chart;
    }, {
        delay: 100,
        observeVisibility: true,
        onResize: (chart, width) => {
            chart.updateOptions({ chart: { width } }, false, false);
        }
    });
}

function updateAllChartColors() {
    const colors = getThemeColors();
    const isDark = document.documentElement.classList.contains('dark');

    chartInstances.forEach((instance) => {
        if (instance.chart) {
            // Skip theme update for charts that should keep their fixed color (e.g., Bounce Rate)
            if (instance.skipThemeUpdate) {
                instance.chart.updateOptions({
                    fill: {
                        gradient: {
                            shade: isDark ? 'dark' : 'light',
                            opacityFrom: isDark ? 0.25 : 0.15,
                        }
                    },
                    tooltip: { theme: isDark ? 'dark' : 'light' }
                }, false, false);
            } else {
                const chartColor = instance.colorOverride || colors.primary;
                instance.chart.updateOptions({
                    colors: [chartColor],
                    fill: {
                        gradient: {
                            shade: isDark ? 'dark' : 'light',
                            gradientToColors: [chartColor],
                            opacityFrom: isDark ? 0.25 : 0.15,
                        }
                    },
                    tooltip: { theme: isDark ? 'dark' : 'light' }
                }, false, false);
            }
        }
    });
}

function cleanup() {
    chartInstances.forEach((instance) => {
        if (instance.chart) instance.chart.destroy();
    });
    chartInstances.clear();
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }
}

export function initMetricsRow() {
    cleanup();

    // Create sparklines with varied data patterns for visual variety
    // Revenue: Strong upward trend with some volatility
    createSparkline('metric-sparkline-revenue', [28000, 32000, 29000, 41000, 38000, 52000, 48000, 61000, 58000, 72000]);

    // Subscriptions: Steady growth with acceleration
    createSparkline('metric-sparkline-subs', [80, 95, 120, 145, 190, 280, 350, 420, 510, 610]);

    // Bounce Rate: Declining trend (good) - ALWAYS RED, not theme responsive
    createSparkline('metric-sparkline-bounce', [38, 35, 32, 28, 31, 25, 22, 19, 16, 12]);

    // Active Users: Fluctuating but growing with peaks
    createSparkline('metric-sparkline-active', [180, 240, 320, 280, 390, 350, 450, 520, 480, 573]);

    themeObserver = setupThemeObserver(updateAllChartColors);
}
