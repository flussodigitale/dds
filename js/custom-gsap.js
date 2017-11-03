$(document).ready(function(){

    function resizeForm(){
        if(width > 1024) {
            // Inizializzo Scroll Magic
            var controller = new ScrollMagic.Controller();


            // Scena TAB
            var TabScene = new ScrollMagic.Scene({
                triggerElement: '#tab-content-container',
                triggerHook: 0.8,
                reverse: false
            })
            .setClassToggle('#tab-content-container', 'fade-in')
            .addTo(controller);


            // Scena MOTIVATION
            var MotivScene = new ScrollMagic.Scene({
                triggerElement: '#motivation',
                triggerHook: 1,
                reverse: false
            })
            .setClassToggle('#motivation', 'motivation-show')
            .addTo(controller);


            // Scena Background Title (SERVIZI)
            var BgTitleServices = new ScrollMagic.Scene({
                triggerElement: '.services',
                triggerHook: 1,
            })
            .setClassToggle('.services #servizi-bg-title', 'show-bg-title')
            .addTo(controller);


            // Scena Servizi (Immagini a sinistra)
            $('.services__container .row.normal img').each(function(){
                var ServSceneImg = new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.8,
                    reverse: false
                })
                .setClassToggle(this, 'show-service')
                .addTo(controller);
            })


            // Scena Servizi (Immagini a destra)
            $('.services__container .row.inverse img').each(function(){
                var ServSceneImg = new ScrollMagic.Scene({
                    triggerElement: this,
                    triggerHook: 0.8,
                    reverse: false
                })
                .setClassToggle(this, 'show-service')
                .addTo(controller);
            })

        } else {
            // Responsive: 
            $('#tab-content-container').addClass('fade-in')
            $('#motivation').addClass('motivation-show');
            $('.services #servizi-bg-title').addClass('show-bg-title');
            $('.services__container .row.normal img').addClass('show-service');
            $('.services__container .row.inverse img').addClass('show-service');
        }
    }
    window.onresize = resizeForm;
    resizeForm();
});