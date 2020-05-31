/* Theme Name: PataPortfolio - Responsive Personal Portfolio Template
   Author: Themesdesign
   Version: 1.0.0
   File Description: Main Js file of the template
*/

! function($) {
    "use strict";

    var PataPortfolioApp = function() {};

    PataPortfolioApp.prototype.initStickyMenu = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            if (scroll >= 50) {
                $(".sticky").addClass("nav-sticky");
            } else {
                $(".sticky").removeClass("nav-sticky");
            }
        });
    },
    
    PataPortfolioApp.prototype.initSmoothLink = function() {
        $('.navbar-nav a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },

    PataPortfolioApp.prototype.initScrollspy = function() {
        $("#navbarCollapse").scrollspy({ offset: 20 });
    },

    PataPortfolioApp.prototype.initHomeTextAnimation = function()  {
        $('.text-animate').each(function() {
            $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
        });

        anime.timeline({
            loop: true
        })
        .add({
            targets: '.text-animate .letter',
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 950,
            delay: function(el, i) {
                return 70 * i;
            }
        }).add({
            targets: '.text-animate',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
    }

    PataPortfolioApp.prototype.initTestiMonial = function() {
         $("#owl-demo").owlCarousel({
            autoPlay: 3000, 
            items: 2,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3]
        });
    },

    PataPortfolioApp.prototype.initPortfolioFilter = function() {
        $(window).on('load', function() {
            // Filter 
            //PORTFOLIO FILTER 
            var $container = $('.projects-wrapper');
            var $filter = $('#filter');
            // Initialize isotope 
            $container.isotope({
                filter: '*',
                layoutMode: 'masonry',
                animationOptions: {
                    duration: 750,
                    easing: 'linear'
                }
            });
            // Filter items when filter link is clicked
            $filter.find('a').click(function() {
                var selector = $(this).attr('data-filter');
                $filter.find('a').removeClass('active');
                $(this).addClass('active');
                $container.isotope({
                    filter: selector,
                    animationOptions: {
                        animationDuration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
            /*END*/
        });
    },

    PataPortfolioApp.prototype.initCounter = function() {
        var a = 0;
        $(window).scroll(function() {
            var oTop = $('#counter').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
                $('.counter-value').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    $({
                        countNum: $this.text()
                    }).animate({
                            countNum: countTo
                        },

                        {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.countNum));
                            },
                            complete: function() {
                                $this.text(this.countNum);
                                //alert('finished');
                            }

                        });
                });
                a = 1;
            }
        });
    },

    PataPortfolioApp.prototype.initMfpVideo = function() {
        $('.mfp-image').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            }
        });
    },

    PataPortfolioApp.prototype.initBacktoTop = function() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        }); 
        $('.back-to-top').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
    },

    PataPortfolioApp.prototype.initContact = function() {
         $('#contact-form').submit(function() {

            var action = $(this).attr('action');

            $("#message").slideUp(750, function() {
                $('#message').hide();

                $('#submit')
                    .before('')
                    .attr('disabled', 'disabled');

                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        comments: $('#comments').val(),
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#cform img.contact-loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#cform').slideUp('slow');
                    }
                );

            });

            return false;

        });
    },

    
    PataPortfolioApp.prototype.init = function() {
        this.initStickyMenu();
        this.initSmoothLink();
        this.initScrollspy();
        this.initHomeTextAnimation();
        this.initTestiMonial();
        this.initPortfolioFilter();
        this.initMfpVideo();
        this.initCounter();
        this.initContact();
        this.initBacktoTop();
    },
    //init
    $.PataPortfolioApp = new PataPortfolioApp, $.PataPortfolioApp.Constructor = PataPortfolioApp
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.PataPortfolioApp.init();
}(window.jQuery);