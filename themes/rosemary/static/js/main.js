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
    $('.newsletter_form').submit(function(event) {
        subscribe();
        $('.newsletter__info').addClass('working');
        $('.newsletter__submit').prop('disabled', true);
        $('.newsletter__email').prop('disabled', true);
        event.preventDefault();
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


function subscribe() {
    var email = encodeURIComponent(document.forms['newsletter_form']['email'].value);
    var ref = encodeURIComponent(document.forms['newsletter_form']['ref'].value);
    var entry_email = 'entry.1684792530';
    var entry_ref = 'entry.1800592224';
    var base_url = 'https://docs.google.com/forms/d/e/1FAIpQLSdmipvslotruk2_Mg8S9R_Ux6IJklJgRKW1yUEd0225CjLWdg/formResponse?';
    var submitURL = (base_url + entry_email + '=' + email + '&' + entry_ref + '=' + ref + '&submit=Submit');

    if (email && ref) {
        $('.newsletter_subscribe').attr('src', submitURL);
        $('.newsletter_subscribe').on('load', function() {
            $.confetti.start();
            $('.newsletter__info').removeClass('working').addClass('success');
            $('.button__text').html('<i class="fas fa-check"></i>');
        });
    } else {
        console.log('Error: No values passed to function.');
    }
}