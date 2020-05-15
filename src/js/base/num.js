var num = function(from , to){
    return Math.floor(Math.random() * to)  + from;
};

// array of number
var numArr = function(length , max){
    return Array.from({length: length}, () => Math.floor(Math.random() * max));
}


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
// end 4 digits




