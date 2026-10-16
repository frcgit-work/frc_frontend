/*
 Theme Name: Graptor
 Theme URI: https://psdtowpwork.com/html/graptor/
 Author: nsstheme
 Author URI: https://themeforest.net/user/nsstheme
 Description: Graptor - Technology & IT Solutions HTML5 Responsive Template
 Version: 1.0
 License:
 License URI:
 */
 
/*=======================================================================
 [Table of contents]
 =========================================================================
 1. All Slider 
 2. Popup
 3. Search Toggle
 4. Widget Toggle
 5. Skills
 6. Funfact
 7. Back To Top
 8. Preloader
 9. Mobile Menu
 10. Fixed Header 
 11. Contact Form Submission
 12. Suffle Filter
 13. Image Transform
 14. One Page Nav
 */

(function ($) {
    'use strict';


    /*--------------------------------------------------------
    / 1. All Slider 
    /----------------------------------------------------------*/
    /*--- Hero Silder 01 ---*/
    if($(".hero-slider-01").length > 0){
       $('.hero-slider-01').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 0,
            animateOut: 'fadeOut',
            nav: true,
            navText: ['<i class="nss-angle-left2"></i>', '<i class="nss-angle-right2"></i>'],
            mouseDrag: false,
            autoplayTimeout: 7000,
            dots: true,
            items: 1
        });
    }
    $('[data-bg-image]').each(function() {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });

    /*--- Hero Silder 02 ---*/
    if($(".hero-slider-02").length > 0){
       $('.hero-slider-02').owlCarousel({
            autoplay: true,
            loop: true,
            margin: 0,
            animateOut: 'fadeOut',
            nav: true,
            navText: ['<i class="nss-angle-left2"></i>', '<i class="nss-angle-right2"></i>'],
            mouseDrag: false,
            autoplayTimeout: 6000,
            dots: true,
            items: 1
        });
    }
    $('[data-bg-image]').each(function() {
        var $this = $(this),
            $image = $this.data('bg-image');
        $this.css('background-image', 'url(' + $image + ')');
    });

    /*--- Client Silder ---*/
    if($(".client-slider").length > 0){
       $('.client-slider').owlCarousel({
            autoplay: true,
            loop: false,
            margin: 30,
            responsiveClass: true,
            nav: false,
            dots: false,
            smartSpeed: 800,
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                1023: {
                    items: 4
                },
            }
        });
    }

    /*--- Testimonial Silder ---*/
    if($(".testimonial-slider").length > 0){
       $('.testimonial-slider').owlCarousel({
            loop: false,
            margin: 30,
            responsiveClass: true,
            dots: false,
            autoplay: false,
            smartSpeed: 600,
            center: false,
            nav: true,
            navText: ['<i class="nss-arrow-left1"></i>', '<i class="nss-arrow-right1"></i>'],
            items: 3,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    /*--- Folio Silder ---*/
    if($(".folio-slider").length > 0){
       $('.folio-slider').owlCarousel({
            loop: false,
            margin: 30,
            responsiveClass: true,
            dots: false,
            smartSpeed: 700,
            animateIn: 'slideInLeft',
            animateOut: 'slideOutRight',
            nav: true,
            navText: ['<i class="nss-arrow-left1"></i>', '<i class="nss-arrow-right1"></i>'],
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                760: {
                    items: 2
                },
                1023: {
                    items: 3
                },
                1600: {
                    items: 4
                },
            }
        });
    }

    /*--- Service Silder ---*/
    if($(".service-slider").length > 0){
       $('.service-slider').owlCarousel({
            loop: false,
            margin: 30,
            responsiveClass: true,
            dots: false,
            smartSpeed: 700,
            animateIn: 'slideInLeft',
            animateOut: 'slideOutRight',
            nav: false,
            navText: ['<i class="nss-arrow-left1"></i>', '<i class="nss-arrow-right1"></i>'],
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                991: {
                    items: 2
                },
                1300: {
                    items: 3
                },
                1600: {
                    items: 4
                },
            }
        });
    }

    /*--- Service Silder ---*/
    if($(".team-slider").length > 0){
       $('.team-slider').owlCarousel({
            loop: false,
            margin: 25,
            responsiveClass: true,
            dots: false,
            smartSpeed: 700,
            animateIn: 'slideInLeft',
            animateOut: 'slideOutRight',
            nav: false,
            navText: ['<i class="nss-arrow-left1"></i>', '<i class="nss-arrow-right1"></i>'],
            items: 4,
            responsive: {
                0: {
                    items: 1
                },
                760: {
                    items: 2
                },
                991: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1600: {
                    items: 6
                },
            }
        });
    }

    /*--- Testimonial Silder ---*/
    if($(".testimonial-slider-two").length > 0){
       $('.testimonial-slider-two').owlCarousel({
            loop: false,
            margin: 30,
            responsiveClass: true,
            dots: false,
            autoplay: true,
            smartSpeed: 600,
            center: false,
            nav: false,
            items: 2,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                }
            }
        });
    }

    /*--------------------------------------------------------
    / 2. Popup
    /----------------------------------------------------------*/
    $('.popup').lightcase({
        transition: 'elastic',
        showSequenceInfo: false,
        slideshow: false,
        swipe: true,
        showTitle: false,
        controls: true
    });
    
    /*--------------------------------------------------------------------------
    / 3. Search Toggler
    /------------------------------------------------------------------------*/
    $('.btn-search').on('click', function (e) {
        e.preventDefault();
        $('.popup_search_sec').toggleClass('active');
    });
    $('.popup_search_overlay').on('click', function () {
        $('.popup_search_sec').removeClass('active');
    });
    $('.popup_search_form input').on('focus', function(){
        $('.popup_search_form').addClass('focused');
    });
    $('.popup_search_form input').on('blur', function(){
        $('.popup_search_form').removeClass('focused');
    });

    /*--------------------------------------------------------------------------
    / 4. Widget Toggler
    /------------------------------------------------------------------------*/
    $('.navigator').on('click', function (e) {
        e.preventDefault();
        $('.popup_sidebar_sec').toggleClass('active');
    });
    $('.popup_sidebar_overlay, .widget_closer').on('click', function () {
        $('.popup_sidebar_sec').removeClass('active');
    });

    /*--------------------------------------------------------
    / 5. Skills
    /--------------------------------------------------------*/
    if ($(".single_skill").length > 0)
    {
        $('.single_skill').appear();
        $('.single_skill').on('appear', loadSkills);
    }
    var coun = true;
    function loadSkills()
    {
        $(".single_skill").each(function () {
            var datacount = $(this).attr("data-parcent");
            $(".ss_child", this).animate({'width': datacount + '%'}, 2000);
            if (coun)
            {
                $(this).find('span').each(function () {
                    var $this = $(this);
                    $({Counter: 0}).animate({Counter: datacount}, {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) + '%');
                        }
                    });
                });

            }
        });
        coun = false;
    }
    /*--------------------------------------------------------
    / 6. Funfact Count
    /---------------------------------------------------------*/
    var skl = true;
    $('.timer').appear();
    $('.timer').on('appear', function () {
        if (skl)
        {
            $('.timer').each(function () {
                var $this = $(this);
                jQuery({Counter: 0}).animate({Counter: $this.attr('data-counter')}, {
                    duration: 3000,
                    easing: 'swing',
                    step: function () {
                        var num = Math.ceil(this.Counter).toString();
                        $this.html(num);
                    }
                });
            });
            skl = false;
        }
    });

    /*--------------------------------------------------------
    / 7. Back To Top
    /----------------------------------------------------------*/
    var back = $("#back-to-top"),
        body = $("body, html");
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > $(window).height())
        {
            back.css({bottom: '20px', opacity: '1', visibility: 'visible'});
        } else
        {
            back.css({bottom: '-20px', opacity: '0', visibility: 'hidden'});
        }
    });
    body.on("click", "#back-to-top", function (e) {
        e.preventDefault();
        body.animate({scrollTop: 0}, 800);
        return false;
    });

    /*--------------------------------------------------------
    / 8. Preloader
    /----------------------------------------------------------*/
    $(window).on('load', function (event) {
        $('.preloader').delay(800).fadeOut(500);
    })

    /*--------------------------------------------------------
    / 9. Mobile Menu
    /---------------------------------------------------------*/
    $(".navbar-toggler").on('click', function () {
        $(this).toggleClass('active');
    });
    var subMenu = $(".sub-menu-bar .navbar-nav .sub-menu");
    if (subMenu.length) {
        subMenu.parent('li').children('a').append(function () {
            return '<span class="submenu-toggler"><i class="nss-arrow-down1"></i></span>';
        });
        var subMenuToggler = $(".submenu-toggler");
        subMenuToggler.on('click', function () {
            $(this).parent().parent().children(".sub-menu").slideToggle();
            return false
        });
    }
    /*--------------------------------------------------------
    / 10. Fixed Header
    /----------------------------------------------------------*/
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 40)
        {
            $(".head-sticky").addClass('fix-header animated slideInDown');
        } else
        {
            $(".head-sticky").removeClass('fix-header animated slideInDown');
        }
    });

    /*--------------------------------------------------------
    / 11. Contact Form Submission
    /--------------------------------------------------------*/
    $('#contact-form').on('submit', function (e) {
        e.preventDefault();
        var $this = $(this);

        $('button[type="submit"]', this).attr('disabled', 'disabled')
        $('.graptor_loader', this).fadeIn();
        var form_data = $this.serialize();
        var required = 0;
        $(".required", this).each(function () {
            if ($(this).val() === ''){
                $(this).addClass('reqError');
                required += 1;
            } else{
                if ($(this).hasClass('reqError'))
                {
                    $(this).removeClass('reqError');
                    if (required > 0)
                    {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: 'POST',
                url: 'assets/mail/mail.php',
                data: {form_data: form_data},
                success: function (data) {
                    $('button[type="submit"]', $this).removeAttr('disabled');
                    $('.graptor_loader', $this).fadeOut();
                    $('.con_message', $this).fadeIn().html('<strong>Congratulations!</strong> Your query successfully sent to site admin.').removeClass('alert-warning').addClass('alert-success');
                    setTimeout(function () {
                        $('.con_message', $this).fadeOut().html('').removeClass('alert-success alert-warning');
                    }, 5000);
                }
            });
        } else {
            $('button[type="submit"]', $this).removeAttr('disabled');
            $('.graptor_loader', $this).fadeOut();
            $('.con_message', $this).fadeIn().html('<strong>Opps!</strong> Errpr found. Please fix those and re submit.').removeClass('alert-success').addClass('alert-warning');
            setTimeout(function () {
                $('.con_message', $this).fadeOut().html('').removeClass('alert-success alert-warning');
            }, 5000);
        }
    });
    $(".required").on('keyup', function () {
        $(this).removeClass('reqError');
    });

    /*--------------------------------------------------------
    / 12. Suffle Filter
    /--------------------------------------------------------*/
    $(window).on('load', function () {
        if ($(".shafull-container").length > 0)
        {
            var $grid = $('.shafull-container');
            $grid.shuffle({
                itemSelector: '.shaf-item',
                sizer: '.shaf-sizer'
            });
            /* reshuffle when user clicks a filter item */
            $('.shaf-filter li').on('click', function () {
                // set active class
                $('.shaf-filter li').removeClass('active');
                $(this).addClass('active');
                // get group name from clicked item
                var groupName = $(this).attr('data-group');
                // reshuffle grid
                $grid.shuffle('shuffle', groupName);
            });
        }
    });
    /*--------------------------------------------------------
    / 13. Image Transform
    /--------------------------------------------------------*/
    var o = $(".card");
    $("#skewban").on("mousemove", function (t) {
      var e = -($(window).innerWidth() / 2 - t.pageX) / 40,
        n = ($(window).innerHeight() / 2 - t.pageY) / 50;
        o.attr("style","transform: rotateY(" + e +" deg) rotateX(" + n + " deg);-webkit-transform: rotateY(" + e + "deg) rotateX(" + n + "deg);-moz-transform: rotateY(" + e + "deg) rotateX(" + n + "deg)"
      );
    });
    /*--------------------------------------------------------
    / 14. One Page Nav
    /--------------------------------------------------------*/
    function onePageNav(element) {
        if ($(element).length > 0) {
          $(element).each(function () {
            $(this).find('a').each(function () {
              $(this).on('click', function () {
                var target = $(this.getAttribute('href'));
                if (target.length) {
                  event.preventDefault();
                  $('html, body').stop().animate({
                    scrollTop: target.offset().top - 100
                  }, 1000);
                };

              });
            });
          })
        }
    };
    onePageNav('.onepage-nav');

})(jQuery);