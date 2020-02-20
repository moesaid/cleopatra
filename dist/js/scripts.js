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
  
  var chart = new ApexCharts(document.querySelector("#SummaryChart"), options);
  
  chart.render();
  

// check if the page have dropdwon menu
var dropdown = document.getElementsByClassName('dropdown');

if (dropdown.length >= 1) {
    
    for (let i = 0; i < dropdown.length; i++) {
        const item = dropdown[i];

        var menu,btn,overflow;
        
        item.addEventListener('click' , function(){            

            for (let i = 0; i < this.children.length; i++) {
                const e = this.children[i];

                if (e.classList.contains('menu')) {
                    menu = e;                  
                }else if (e.classList.contains('menu-btn')) {
                    btn = e;
                }else if (e.classList.contains('menu-overflow')) {
                    overflow = e;
                }
                              
            }
            
            if (menu.classList.contains('hidden')) {
                // show the menu
                showMenu();
            }else{
                // hide the menu
                hideMenu()
            }      


        });        
        

        var showMenu = function(){
            menu.classList.remove('hidden');
            menu.classList.add('fadeIn');
            overflow.classList.remove('hidden');            
        };

        var hideMenu = function(){
            menu.classList.add('hidden');
            overflow.classList.add('hidden');            
            menu.classList.remove('fadeIn');            
        };
        
                
        
    }    
    
};

var navbarToggle = document.getElementById('navbarToggle'),
    navbar       = document.getElementById('navbar');



navbarToggle.addEventListener('click' , function(){

    if (navbar.classList.contains('md:hidden')) {
        navbar.classList.remove('md:hidden');
        navbar.classList.add('fadeIn');   
    }else{
        var _classRemover =  function () {
            navbar.classList.remove('fadeIn');   
            navbar.classList.add('fadeOut');
            console.log('removed');
            
        };  
        
        var animate = async function(){
            await _classRemover();
            console.log('animated');
            
            setTimeout(function(){
                navbar.classList.add('md:hidden');
                navbar.classList.remove('fadeOut');
            }, 450);            
        };

        animate();        
    };
    
});
var num = function(from , to){
    return Math.floor(Math.random() * to)  + from;
};


// return 2 digit
var el_2 = document.getElementsByClassName('num-2');
var display_2 = function(){
    for (let i = 0; i < el_2.length; i++) {
        const e = el_2[i];
        
        e.innerText = num(1 , 99);
        
    }   
};

if (el_2.length > 0) {
    display_2();   
}
// end 2 digit



// return 3 digit
var el_3 = document.getElementsByClassName('num-3');
var display_3 = function(){
    for (let i = 0; i < el_3.length; i++) {
        const e = el_3[i];
        
        e.innerText = num(99 , 999);
        
    }   
};

if (el_3.length > 0) {
    display_3();   
}
// end 3 digit







// return 4 digit
var el_4 = document.getElementsByClassName('num-4');
var display_4 = function(){
    for (let i = 0; i < el_4.length; i++) {
        const e = el_4[i];
        
        e.innerText = num(999 , 9999);
        
    }   
};

if (el_4.length > 0) {
    display_4();   
}
// end 4 digit





// work with sidebar
var btn     = document.getElementById('sliderBtn'),
    sideBar = document.getElementById('sideBar'),
    sideBarHideBtn = document.getElementById('sideBarHideBtn');

    // show sidebar
    btn.addEventListener('click' , function(){    
        if (sideBar.classList.contains('md:-ml-64')) {
            sideBar.classList.replace('md:-ml-64' , 'md:ml-0');
            sideBar.classList.remove('md:slideOutLeft');
            sideBar.classList.add('md:slideInLeft');
        };
    });

    // hide sideBar    
    sideBarHideBtn.addEventListener('click' , function(){            
        if (sideBar.classList.contains('md:ml-0' , 'slideInLeft')) {      
            var _class = function(){
                sideBar.classList.remove('md:slideInLeft');
                sideBar.classList.add('md:slideOutLeft');
        
                console.log('hide');              
            };
            var animate = async function(){
                await _class();

                setTimeout(function(){
                    sideBar.classList.replace('md:ml-0' , 'md:-ml-64');
                    console.log('animated');
                } , 300);                                                
                
            };            
                    
            _class(); 
            animate();
        };
    });
// end with sidebar
