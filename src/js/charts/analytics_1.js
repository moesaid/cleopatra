import ApexCharts from 'apexcharts';
import { numArr } from '../base/num.js';
import { getChartOptions } from './chart-utils.js';

export function initAnalytics1() {
  const analytics_1 = document.querySelectorAll(".analytics_1");

  if (analytics_1.length > 0) {
    // First chart
    if (analytics_1[0]) {
      const chart1 = new ApexCharts(analytics_1[0], getChartOptions("area", '60%', numArr(10, 99), '#4fd1c5'));
      chart1.render();
    }

    // Second chart
    if (analytics_1[1]) {
      const chart2 = new ApexCharts(analytics_1[1], getChartOptions("area", '60%', numArr(10, 99), '#4c51bf'));
      chart2.render();
    }
  }
}