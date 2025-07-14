(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    //Navigation Section
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });


    // Owl Carousel
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      autoplay:true,
    })


    // PARALLAX EFFECT
    $.stellar();  


    // SMOOTHSCROLL
    $(function() {
      $('.navbar-default a, #home a, footer a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
            event.preventDefault();
      });
    });  


    // WOW ANIMATION
    new WOW({ mobile: false }).init();

})(jQuery);

// Doctor Gallery - Isolated in its own namespace to avoid conflicts
var doctorGallery = (function() {
    // Private variables and functions
    function _initGallery() {
        var firstThumbnail = document.querySelector('.doctor-image-gallery .thumbnail-item');
        if (firstThumbnail) {
            firstThumbnail.classList.add('active');
        }
    }
    
    // Public API
    return {
        changeMainImage: function(src) {
            // Update main image source
            var mainImage = document.querySelector('.doctor-image-gallery .main-image img');
            if (mainImage) {
                mainImage.src = src;
            }
            
            // Update active thumbnail
            var thumbnails = document.querySelectorAll('.doctor-image-gallery .thumbnail-item');
            thumbnails.forEach(function(item) {
                if (item.querySelector('img').src === src) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        },
        
        init: function() {
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', _initGallery);
            } else {
                _initGallery();
            }
        }
    };
})();

// Initialize the gallery
doctorGallery.init();
