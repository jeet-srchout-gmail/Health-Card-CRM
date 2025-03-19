(function ($) {
  "use strict";

  var w = $(window).width();

  var HealthCardSwiperHandler = function ($scope, $) {
    var $element = $scope.find(".pix-swiper-widget");

    $element.HealthCardSwiper();
  };

  var HealthCardSwiperHcardsHandler = function ($scope, $) {
    var $element = $scope.find(".pix-swiper-widget");

    $element.HealthCardSwiper();
    $element
      .find(".lastchanceProducts")
      .on("breakpoint", function (event, swiper, breakpoint) {
        $(this)
          .find(".productCard2__slider")
          .each(function () {
            var imgBox = $(this).children(".productCard2__images"),
              hoverBox = imgBox.children(".productCard2__hover"),
              hoverDots = imgBox.next(".productCard2__dots"),
              countImg = imgBox.children("span").length;

            hoverBox.children().on("touch touchstart mouseover", function () {
              var index = $(this).index();
              imgBox
                .children()
                .eq(index)
                .addClass("active")
                .siblings()
                .removeClass("active");
              hoverDots
                .children()
                .eq(index)
                .addClass("active")
                .siblings()
                .removeClass("active");
            });

            hoverDots.children().on("touch touchstart mouseover", function () {
              var index = $(this).index();
              imgBox
                .children()
                .eq(index)
                .addClass("active")
                .siblings()
                .removeClass("active");
              hoverDots
                .children()
                .eq(index)
                .addClass("active")
                .siblings()
                .removeClass("active");
            });

            if (w <= 768) {
              imgBox.on("click touch touchstart", function (e) {
                e.preventDefault();
              });
            }
          });
      });
  };

  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-logos-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-product-categories-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-posts-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-products-extended-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-products-vcard-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-products-hcard-carousel.default",
      HealthCardSwiperHcardsHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-products-double-block-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-projects-extended-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-team-double-block-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-testimonials-carousel.default",
      HealthCardSwiperHandler
    );
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/nordis-team-carousel.default",
      HealthCardSwiperHandler
    );
  });
})(jQuery);
