// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
        $(".top__header__nav input[type='checkbox']").prop('checked', false); 
        $('.nav-panel').removeClass('open-menu');
        $(".nav-dropdown").removeClass('open-dropdown');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

// Apre e Chiude il menu servizi
$(".nav-dropdown").click(function(e){
    e.preventDefault();
    $('.nav-panel').toggleClass('open-menu');
    $('.scrolled').toggleClass('extend-menu-scrolled');
    $(this).toggleClass('open-dropdown');
});

// Chiude tutto quando premo il toggle menu
$("label[for='toggle-menu']").click(function(){
    if($(".top__header__nav input[type='checkbox']").is(':not(checked)')) {
        $('.nav-panel').removeClass('open-menu');
        $(".nav-dropdown").removeClass('open-dropdown');
        $('.scrolled').removeClass('extend-menu-scrolled');
    }
})

// Funzione per la sidebar in single.html
$(document).ready(function(){
    $('.single-toggle').click(function(){
      $(this).toggleClass('active');
      $('body').toggleClass('hide-sidebar');
    });

    if(window.innerWidth <= 1024 ) {
        $('body').addClass('hide-sidebar');
        $('.single-toggle').removeClass('active');

        $('.single-toggle').click(function(){ 
            $('html').toggleClass('lock');
        });
    }
  });
