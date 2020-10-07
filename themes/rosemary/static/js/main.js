$(document).ready(function() {
    $('.loading').removeClass('active');
    $('.local').click(function(event) {
        var loc = $(this).attr('href');
        transition(loc);
        event.preventDefault();
    });
});

function transition(loc) {
    console.log('clicked: ' + loc);
    if (loc == '/' || loc == 'http://localhost:1313/' || loc == "http://localhost:1313/") {
        $('.loading').addClass('black');
    }
    $('.loading').addClass('active');
    setTimeout(function() {
        window.location.assign(loc);
    },800);
}