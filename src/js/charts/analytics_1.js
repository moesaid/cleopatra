var options = function(type, height, numbers , color){
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
        data: numbers
    }
    ],    
    fill: {
      colors: [color],
    },
    stroke:{
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
}
  

  var analytics_1 =  document.getElementsByClassName("analytics_1");
    
  if (analytics_1 != null && typeof(analytics_1) != 'undefined') {
      var chart = new ApexCharts(analytics_1[0], options("area" , '51px' , numArr(10,99) , '#4fd1c5')); 
      var chart_1 = new ApexCharts(analytics_1[1], options("area" , '51px' , numArr(10,99) , '#4c51bf')); 
      chart.render();       
      chart_1.render();       
  }



  
   