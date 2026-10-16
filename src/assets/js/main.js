$(function() {

	if ( $('.owl-2').length > 0 ) {
        $('.owl-2').owlCarousel({
            center: false,
            items: 1,
            loop: true,
            stagePadding: 0,
            margin: 20,
            smartSpeed: 1000,
            autoplay: true,
            nav: true,
            dots: true,
            pauseOnHover: false,
            responsive:{
              300:{
                margin: 20,
                nav: true,
              items: 2
            },
              400:{
                margin: 20,
                nav: true,
              items: 3
            },
                600:{
                    margin: 20,
                    nav: true,
                  items: 5
                },
                1000:{
                    margin: 20,
                    stagePadding: 0,
                    nav: true,
                  items: 5
                },
                1200:{
                  margin: 20,
                  stagePadding: 0,
                  nav: true,
                items: 6
              },
              1400:{
                margin: 20,
                stagePadding: 0,
                nav: true,
              items: 7
            }
            }
        });            
    }

})
