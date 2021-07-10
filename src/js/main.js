'use strict';

$(function() {
    $(".header__mobile-btn").on("click", function() {
        $(".mobile-menu").toggleClass("active");
    });
    
    $(".mobile-menu__close").on("click", function() {
        $(".mobile-menu").toggleClass("active");
    });

    $("#certs img").on("click", function() {
        $.fancybox.open([{
            src: "/img/certs/1.png"
        }, {
            src: "/img/certs/2_1.png"
        }, {
            src: "/img/certs/2_2.png"
        }], {
            loop: 0
        });
    });

    $("#contact-form__phone").mask("+375 (99) 999-99-99");

    let header = $(".header");
    let headerHeight = header.outerHeight();

    $(".container").scroll(function () {
        if ($(this).scrollTop() > 1) {
            header.addClass("header--fixed");
            $(".container").css({
                paddingTop: headerHeight + "px"
            });
        } else {
            header.removeClass("header--fixed");
            $(".container").css({
                paddingTop: 0
            });
        }
    });

    $(".header__link a").on("click", function() {
        let scrollTo = $(this).attr("href");

        $('.container').animate({
            scrollTop: $('.container').scrollTop() + $(`${scrollTo}`).offset().top - headerHeight
        }, 1000);
    });

    $(".mobile-menu__link a").on("click", function() {
        let scrollTo = $(this).attr("href");

        $(".mobile-menu").removeClass("active");

        $('.container').animate({
            scrollTop: $('.container').scrollTop() + $(`${scrollTo}`).offset().top - headerHeight
        }, 1000);
    });
    
    $(".contact-form__form").on("submit", function(e) {
        e.preventDefault();

        grecaptcha.ready(function () {
            grecaptcha
              .execute("6LdnRF4bAAAAAEAdZtEjWbvvVUGlp0wUVvFQtiEZ", {
                action: "contact",
              })
              .then(function (token) {
                    var recaptchaResponse = document.getElementById("recaptchaResponse");
                    recaptchaResponse.value = token;

                    $(".form-alert").removeClass("active");
        
                    let name = $("#contact-form__name").val();
                    let phone = $("#contact-form__phone").val();
                    let mail = $("#contact-form__email").val();

                    if(name != "" && phone != "" && mail != "") {
                        $("#form-alert__wait").addClass("active");

                        $.ajax({
                            url: '/api/contact/',
                            method: 'post',
                            dataType: 'json',
                            data: {
                                name: name,
                                phone: phone,
                                mail: mail,
                                recaptchaResponse: $("#recaptchaResponse").val()
                            },
                            success: function(data) {
                                $("#form-alert__wait").removeClass("active");
                                if(data.ok) {
                                    $("#form-alert__success").addClass("active");

                                    $("#contact-form__name").val("");
                                    $("#contact-form__phone").val("");
                                    $("#contact-form__email").val("");
                                }else if(!data.email) {
                                    $("#form-alert__email-error").addClass("active");
                                }else{
                                    $("#form-alert__backend-error").addClass("active");
                                }
                            }
                        });
                    }else{
                        $("#form-alert__input-empty-error").addClass("active");
                    }
              })
        });
    });

    $(".form-alert__close").on("click", function() {
        $(this).parent().parent().removeClass("active");
    });
});