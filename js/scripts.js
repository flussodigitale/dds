(function($) {
    
    $(document).ready(function() {
        var TabContainer = document.querySelector('.tab__container');
        
        // Rendo invisibili tutti i contenuti della tab tranne la prima voce
        $('.tab__content').hide();
        $('.tab__content:first').show();

        // Evento al click
        $('.tab label').click(function(e) {
            var CheckedTab = e.target.id;

            $('.tab__content').hide();
            $('#content-' + CheckedTab).fadeIn();
        });

        // Loader
        if ( window.location.pathname == '/' || window.location.pathname == '/index.html' ){
            setTimeout(function(){
                $('body').addClass('loaded');
            }, 1500);
        } else {
            setTimeout(function(){
                $('body').addClass('loaded');
            }, 700)
        }


        /* Slider Progetti*/
        var swiperProjects = new Swiper ('.swiper-container-projects', {
            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            loop: true
        })

        /* Slider Servizi */
        var swiperServices = new Swiper('.swiper-container-services', {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            centeredSlides: true,
            paginationClickable: true,
            spaceBetween: 30,
            autoplay: 2000,
            pagination: false,
            loop: true,
            autoplayDisableOnInteraction: false
        });

        var counter = 0;
        $(window).keydown(function(e){
            if(e.which === 9){ //it's the tab key!
                counter += 1;
                if(counter > 4) {
                    $('#input-1').attr("autofocus");
                    counter = 0;
                }
            }
        });


        // Fixed Header
        if(width > 1024) {
            var topH = $(".top").height();
            var header = $("#header");

            $(window).on("scroll", function () {
                handleTopHome = topH - 300;
                if ($(this).scrollTop() > handleTopHome ) {
                    header.addClass("scrolled");
                } else {
                    header.removeClass("scrolled");
                }

            }).on("resize", function(){ // If the user resizes the window
                topH = $(".top").height(); // you'll need the new height value
            });
            
        } else {
            $('header').addClass("scrolled");
        }

    });


})(jQuery);
