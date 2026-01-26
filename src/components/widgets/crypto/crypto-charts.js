/**
 * Crypto Dashboard Charts Initialization
 * Handles sparkline charts for trending tokens and market table
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors, getPrimaryColor } from '../chart-utils.js';
import { cryptoMarketData } from '../../../data/crypto-market.js';

// Store chart instances for cleanup
const charts = {
    sparklines: [],
    marketSparklines: []
};

/**
 * Get sparkline chart options for trending tokens
 */
function getSparklineOptions(data, isPositive = true) {
    const color = isPositive ? '#10b981' : '#ef4444'; // emerald-500 : rose-500

    return {
        chart: {
            type: 'area',
            height: 80,
            sparkline: { enabled: true },
            animations: { enabled: true, speed: 500 }
        },
        series: [{ name: 'Price', data }],
        stroke: { curve: 'smooth', width: 2 },
        colors: [color],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        tooltip: { enabled: false }
    };
}

/**
 * Get market table sparkline options
 */
function getMarketSparklineOptions(data) {
    const primaryColor = getPrimaryColor();

    return {
        chart: {
            type: 'line',
            height: 32,
            width: 80,
            sparkline: { enabled: true },
            animations: { enabled: false }
        },
        series: [{ name: 'Price', data }],
        stroke: { curve: 'smooth', width: 1.5 },
        colors: [primaryColor],
        tooltip: { enabled: false }
    };
}

/**
 * Initialize all crypto dashboard charts
 */
export function initCryptoCharts() {
    // Cleanup previous charts
    charts.sparklines.forEach(chart => chart?.destroy());
    charts.marketSparklines.forEach(chart => chart?.destroy());
    charts.sparklines = [];
    charts.marketSparklines = [];

    // Init trending token sparklines
    cryptoMarketData.trendingTokens.forEach((token, index) => {
        const elementId = `crypto-spark-${index + 1}`;
        const container = document.getElementById(elementId);
        if (container && typeof ApexCharts !== 'undefined') {
            initChartDeferred(elementId, (el) => {
                const chart = new ApexCharts(el, getSparklineOptions(token.chartData, token.change >= 0));
                chart.render();
                charts.sparklines.push(chart);
                return chart;
            }, { delay: 100, observeVisibility: true });
        }
    });

    // Init market table sparklines
    cryptoMarketData.marketTable.slice(0, 6).forEach((item, index) => {
        const elementId = `market-spark-${index + 1}`;
        const container = document.getElementById(elementId);
        if (container && typeof ApexCharts !== 'undefined') {
            initChartDeferred(elementId, (el) => {
                const chart = new ApexCharts(el, getMarketSparklineOptions(item.chartData));
                chart.render();
                charts.marketSparklines.push(chart);
                return chart;
            }, { delay: 150, observeVisibility: true });
        }
    });

    // Setup theme observer
    setupChartThemeObserver();
}

/**
 * Setup theme observer for chart color updates
 */
function setupChartThemeObserver() {
    setupThemeObserver(() => {
        // Update chart colors on theme change
        charts.sparklines.forEach((chart, i) => {
            if (chart) {
                const token = cryptoMarketData.trendingTokens[i];
                const color = token?.change >= 0 ? '#10b981' : '#ef4444';
                chart.updateOptions({ colors: [color] }, false, false);
            }
        });

        charts.marketSparklines.forEach((chart) => {
            if (chart) {
                chart.updateOptions({ colors: [getPrimaryColor()] }, false, false);
            }
        });
    });
}


