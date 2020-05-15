var options = {     
    chart: {
    //   height: 280,
      width: '100%',
      type: "area",
      toolbar: {
        show: false,
       },
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
    series: [
    {
        name: "serie1",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    },
    {
        name: "serie2",
        data: [54, 45, 51, 57, 32, 33, 31, 31, 46, 37, 33]
    }
    ],    
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.9,
        opacityTo: 0.7,
        stops: [0,90, 100]
      },
      colors: ['#4fd1c5'],
    },
    stroke:{
        colors: ['#4fd1c5'],
        width: 3
    },    
    yaxis: {
        show: false,        
    }, 
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10],
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
  

  var SummaryChart =  document.getElementById("SummaryChart");
  
  if (SummaryChart != null && typeof(SummaryChart) != 'undefined') {
    var chart = new ApexCharts(document.querySelector("#SummaryChart"), options); 
    chart.render();
  }
  
   