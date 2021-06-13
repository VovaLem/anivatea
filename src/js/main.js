'use strict';

$(function() {
    $("#certs").on("click", function() {
        $.fancybox.open([
            {
                src: "/img/certs/1.png"
            }, {
                src: "/img/certs/2.png"
            }
        ], {
            loop: 1
        })
    });

    let cur = 0;
    setInterval(function() {
        let mainSlide = $("#mainSlide");
        let secondarySlide1 = $("#secondarySlide1");
        let secondarySlide2 = $("#secondarySlide2");
        let secondarySlide3 = $("#secondarySlide3");

        let sliderImages = productImages;

        cur++;
        if(cur > sliderImages.length - 1) {
            cur = 0;
        }

        $(mainSlide).toggleClass("slider-images__main-img--fade");
        setTimeout(function() {
            $(mainSlide).attr("src", sliderImages[cur]);
            $(mainSlide).parent().attr("href", sliderImages[cur]);
            $(mainSlide).toggleClass("slider-images__main-img--fade");
        }, 300);

        let buff1 = cur + 1;
        if(buff1 > sliderImages.length - 1) {
            buff1 -= sliderImages.length;
        }

        $(secondarySlide1).toggleClass("slider-images__image-img--fade");
        setTimeout(function() {
            $(secondarySlide1).attr("src", sliderImages[buff1]);
            $(secondarySlide1).parent().attr("href", sliderImages[buff1]);
            $(secondarySlide1).toggleClass("slider-images__image-img--fade");
        }, 300);

        let buff2 = cur + 2;
        if(buff2 > sliderImages.length - 1) {
            buff2 -= sliderImages.length;
        }

        $(secondarySlide2).toggleClass("slider-images__image-img--fade");
        setTimeout(function() {
            $(secondarySlide2).attr("src", sliderImages[buff2]);
            $(secondarySlide2).parent().attr("href", sliderImages[buff2]);
            $(secondarySlide2).toggleClass("slider-images__image-img--fade");
        }, 300);

        let buff3 = cur + 3;
        if(buff3 > sliderImages.length - 1) {
            buff3 -= sliderImages.length;
        }

        $(secondarySlide3).toggleClass("slider-images__image-img--fade");
        setTimeout(function() {
            $(secondarySlide3).attr("src", sliderImages[buff3]);
            $(secondarySlide3).parent().attr("href", sliderImages[buff3]);
            $(secondarySlide3).toggleClass("slider-images__image-img--fade");
        }, 300);
    }, 5000);
});