/**
 * User Retention Chart Widget
 * Dual-line chart showing signups vs deactivations over 24h
 */

import ApexCharts from 'apexcharts';
import { initChartDeferred, setupThemeObserver, getThemeColors } from '../chart-utils.js';
import { ceoDashboardData } from '../../../data/ceo-dashboard.js';

let chartInstance = null;
let themeObserver = null;

function getChartOptions(width) {
    const colors = getThemeColors();
    const data = ceoDashboardData.retentionData;

    return {
        chart: {
            type: 'area',
            height: 200,
            width: width || '100%',
            toolbar: { show: false },
            fontFamily: 'Inter, system-ui, sans-serif',
            animations: { enabled: true, easing: 'easeinout', speed: 600 },
            redrawOnParentResize: true,
        },
        series: [
            { name: 'Signups', data: data.signups },
            { name: 'Deactivations', data: data.deactivations }
        ],
        colors: [colors.primary, '#ef4444'], // Primary for signups, red for deactivations
        stroke: { width: 2, curve: 'smooth' },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0,
                opacityFrom: 0.2,
                opacityTo: 0,
                stops: [0, 100]
            }
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: data.hours,
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {
                style: { colors: colors.text, fontSize: '10px' },
                rotate: 0,
            }
        },
        yaxis: {
            labels: {
                style: { colors: colors.text, fontSize: '10px' },
                formatter: (val) => (val / 1000).toFixed(0) + 'K'
            }
        },
        grid: {
            borderColor: colors.grid,
            strokeDashArray: 4,
            xaxis: { lines: { show: false } }
        },
        legend: { show: false },
        tooltip: {
            theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
            y: { formatter: (val) => val.toLocaleString() + ' users' }
        },
    };
}

function updateChartColors() {
    if (!chartInstance) return;
    const colors = getThemeColors();
    chartInstance.updateOptions({
        colors: [colors.primary, '#ef4444'],
        xaxis: { labels: { style: { colors: colors.text } } },
        yaxis: { labels: { style: { colors: colors.text } } },
        grid: { borderColor: colors.grid },
        tooltip: { theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light' }
    }, false, false);
}

export function initUserRetentionChart() {
    if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
    }
    if (themeObserver) {
        themeObserver.disconnect();
        themeObserver = null;
    }

    initChartDeferred('retention-chart', (container, width) => {
        const chart = new ApexCharts(container, getChartOptions(width));
        chart.render();
        chartInstance = chart;
        return chart;
    }, {
        delay: 150,
        observeVisibility: true,
    });

    themeObserver = setupThemeObserver(updateChartColors);
}
