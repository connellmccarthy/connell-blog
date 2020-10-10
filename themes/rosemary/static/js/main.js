$(document).ready(function() {
    $('.loading').removeClass('active');
    $('.local').click(function(event) {
        var loc = $(this).attr('href');
        transition(loc);
        event.preventDefault();
    });
    $('.btn_nav_mobile').click(function() {
        showMenu();
    });
});

function transition(loc) {
    if (loc == '/' || loc == 'http://localhost:1313/' || loc == "http://localhost:1313/") {
        $('.loading').addClass('black');
    }
    $('.loading').addClass('active');
    setTimeout(function() {
        window.location.assign(loc);
    },800);
}

function showMenu() {
    console.log('Clicked menu');
    if ($('.nav_menu').hasClass('active')) {
        $('.nav_menu').removeClass('active');
        $('.btn_nav_mobile').removeClass('active');
        $('body').css('overflow', 'scroll');
    } else {
        $('.nav_menu').addClass('active');
        $('.btn_nav_mobile').addClass('active');
        $('body').css('overflow', 'hidden');
    }
}