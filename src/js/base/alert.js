// get the close btn
var alert_button = document.getElementsByClassName("alert-btn-close");

// looping into all alert close btns
for (let i = 0; i < alert_button.length; i++) {
    const btn = alert_button[i];

    btn.addEventListener('click' , function(){
        var dad = this.parentNode;
        dad.classList.add('animated' , 'fadeOut');
        setTimeout(() => {
            dad.remove();
        }, 1000);
    });
    
}