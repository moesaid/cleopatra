export const getChartOptions = function (type, height, numbers, color) {
    return {
        chart: {
            height: height,
            width: '100%',
            type: type,
            sparkline: {
                enabled: true
            },
            toolbar: {
                show: false,
            },
            parentHeightOffset: 0,
        },
        grid: {
            show: false,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false,
        },
        series: [{
            name: "serie1",
            data: numbers
        }],
        fill: {
            colors: [color],
        },
        stroke: {
            colors: [color],
            width: 3
        },
        yaxis: {
            show: false,
        },
        xaxis: {
            show: false,
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            tooltip: {
                enabled: false,
            }
        },

    };
};
