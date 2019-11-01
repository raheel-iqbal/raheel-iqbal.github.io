(function($) {
    "use strict";

    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'),
            portfolio_filter = $('#portfolio_filters');
        if (portfolio_grid) {
            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });
            $('.site-main-menu').on("click", "a", function(e) {
                portfolio_grid.shuffle('update');
            });
            portfolio_filter.on("click", ".filter", function(e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
            });
        }
    }
    $(function() {
        $('#contact-form').validator();
        $('#contact-form').on('submit', function(e) {
            if (!e.isDefaultPrevented()) {
                fetch("https://nodesendmailer.herokuapp.com/", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        from: document.getElementById("form_email").value,
                        name: document.getElementById("form_name").value,
                        text: document.getElementById("form_message").value
                    })
                }).then(function(res){
                    var alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Message Sent!</div>';
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                }).catch(function(res){
                    var alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Error Sending!</div>';
                    $('#contact-form').find('.messages').html(alertBox);
                    $('#contact-form')[0].reset();
                });
                return false;
            }
        });
    });

    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('.site-nav').addClass('mobile-menu-hide');
        }
    }
    $(document).ready(function() {
        var $portfolio_container = $("#portfolio_grid");
        $portfolio_container.imagesLoaded(function() {
            setTimeout(function() {
                portfolio_init(this);
            }, 500);
        });
        $(' #portfolio_grid > figure > a ').each(function() {
            $(this).hoverdir();
        });
        $('.menu-toggle').click(function() {
            $('.site-nav').toggleClass('mobile-menu-hide');
        });
        $(".testimonials.owl-carousel").owlCarousel({
            nav: true,
            items: 1,
            loop: true,
            navText: false,
            margin: 10,
        });
        setTimeout(function() {
            var $container = $(".blog-masonry");
            $container.masonry();
        }, 500);
        $('.site-main-menu').on("click", "a", function(e) {
            var $container = $(".blog-masonry");
            $container.masonry();
        });
        $('.lightbox').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            image: {
                titleSrc: 'title'
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                    '</div>',
                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },
                srcAction: 'iframe_src',
            },
            callbacks: {
                markupParse: function(template, values, item) {
                    values.title = item.el.attr('title');
                }
            },
        });
    });
    $(window).on('load', function() {
        $(".preloader").fadeOut("slow");
    });
    $(window).on('resize', function() {
        mobileMenuHide();
    });
    $('.site-main-menu').on("click", "a", function(e) {
        mobileMenuHide();
    });
})(jQuery);