import ApexCharts from 'apexcharts';
import { numArr } from '../base/num.js';
import { getChartOptions } from './chart-utils.js';

export function initSalesOverview() {
  const sealsOverview = document.getElementById('sealsOverview');
  if (sealsOverview) {
    const sealsOverviewChart = new ApexCharts(sealsOverview, getChartOptions('bar', '100%', numArr(20, 999), '#30aba0'));
    sealsOverviewChart.render();
  }
}