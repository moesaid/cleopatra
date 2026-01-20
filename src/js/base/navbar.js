var navbarToggle = document.getElementById('navbarToggle'),
    navbar = document.getElementById('navbar');



navbarToggle.addEventListener('click', function () {

    if (navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
        navbar.classList.add('fadeIn');
    } else {
        var _classRemover = function () {
            navbar.classList.remove('fadeIn');
            navbar.classList.add('fadeOut');
            console.log('removed');

        };

        var animate = async function () {
            await _classRemover();
            console.log('animated');

            setTimeout(function () {
                navbar.classList.add('hidden');
                navbar.classList.remove('fadeOut');
            }, 450);
        };

        animate();
    };

});