let accessMains = {};

(function ($, accessMains) {
    "use strict";

     /** ------- Pre Loader **/
    $(window).on('load', function () {
        $(".preloader-area").delay(200).fadeOut(500);
    });
    
    /* ================================================= */
    /*	slick Nav
     /* ================================================= */

    /* mobile_menu */

    var menu = $("ul#navigation");
    if (menu.length) {
        menu.slicknav({
            prependTo: ".mobile_menu",
            closedSymbol: "+",
            openedSymbol: "-",
            closeOnClick: true
        });
    }

    /* Smooth Scrolling Using Navigation Menu */

    $('.nav-link[href*="#"]').on("click", function (e) {
        $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 70
        },500);
        e.preventDefault();
    });

    /*  Custom Sticky Menu  */

    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll < 245) {
            $(".header-sticky").removeClass("sticky-bar");
        } else {
            $(".header-sticky").addClass("sticky-bar");
        }
    });


    /* ================================================= */
    /*	Works Area Filter js
    /* ================================================= */
    // $(window).on("load", function () {
        
    // });

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            var $grid;
            $(".filters ul li").on("click", function () {
                $(".filters ul li").removeClass("active");
                $(this).addClass("active");
    
                var data = $(this).attr("data-filter");
                $grid.isotope({
                    filter: data
                });
            });
    
            let workStateCheck = setInterval(() => {
                if (document.getElementById("works")) {
                    $grid = $(".grid").isotope({
                        itemSelector: ".all",
                        percentPosition: true,
                        masonry: {
                            columnWidth: ".all"
                        }
                    });
                    clearInterval(workStateCheck);
                }
            }, 200);
    
            /* ================================================= */
            /*	Testimonial Slider
             /* ================================================= */
    
            let testSliderStateCheck = setInterval(() => {
                if($(".test-slider").length) {
                    $(".test-slider").slick({
                        dots: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        arrows: false
                    });
                }
                clearInterval(testSliderStateCheck);
            }, 200)
            
            clearInterval(stateCheck);
            // document ready
        }
    }, 200);
    
    /* ================================================= */
    /*	Blog Slider
     /* ================================================= */

    function blog_slider() {
        if ($(".blog-slider").length) {
            $(".blog-slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                nav: true,
                autoplay: true,
                smartSpeed: 1500,
                dots: true,
                navContainer: ".blog-text-inner",
                navText: [
                    '<i class="icon-arrow-left"></i>',
                    '<i class="icon-arrow-right"></i>'
                ],
                responsiveClass: true
            });
        }
    }
    blog_slider();

    /* ================================================= */
    /*    sildeBar scroll
     /* ================================================= */
    $.scrollUp({
        scrollName: "scrollUp", 
        topDistance: "300", 
        topSpeed: 300, 
        animation: "fade", 
        animationInSpeed: 200, 
        animationOutSpeed: 200, 
        scrollText: '<i class="icon-arrow-up"></i>',
        activeOverlay: false 
    });
    
    /* ================================================= */
    /*    Hero Area Text Animate
     /* ================================================= */

    var TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtRotate.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    // Added in addRotatesFromViewJS() function. Removed from here
    // window.onload = function () {
    //     var elements = document.getElementsByClassName('txt-rotate');
    //     for (var i = 0; i < elements.length; i++) {
    //         var toRotate = elements[i].getAttribute('data-rotate');
    //         var period = elements[i].getAttribute('data-period');
    //         if (toRotate) {
    //             new TxtRotate(elements[i], JSON.parse(toRotate), period);
    //         }
    //     }
    //     // INJECT CSS
    //     var css = document.createElement("style");
    //     css.type = "text/css";
    //     css.innerHTML = ".txt-rotate > .wrap {padding-right: 2px; border-right: 0.08em solid #e45447 }";
    //     document.body.appendChild(css);
    // };

    // Call rotate with dynamic data
    accessMains.addRotatesFromViewJS = (toRotate) => {
        // Added in view-logic. Removed from here
        let stateCheck = setInterval(() => {
            if (document.readyState === 'complete') {
            // window.onload = function () {
            var elements = document.getElementsByClassName('txt-rotate');
            for (var i = 0; i < elements.length; i++) {
                // var toRotate = elements[i].getAttribute('data-rotate');
                var period = elements[i].getAttribute('data-period');
                if (toRotate) {
                    new TxtRotate(elements[i], toRotate, period);
                }
            }
            // INJECT CSS
            var css = document.createElement("style");
            css.type = "text/css";
            css.innerHTML = ".txt-rotate > .wrap {padding-right: 2px; border-right: 0.08em solid #e45447 }";
            document.body.appendChild(css);
            clearInterval(stateCheck);
            // };
            }
        })
    }


})(window.jQuery, accessMains);


// Resume Navigation

(function ($) {
    //variable that will hold the href attr of the links in the menu
    var sections = [];
    //variable that stores the id of the section
    var id = false;
    //variable for the selection of the anchors in the navbar
    var $navbara = $('#navi a');

    $navbara.on('click', function (e) {
        //prevent the page from refreshing
        e.preventDefault();
        //set the top offset animation and speed
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 180
        }, 500);
        hash($(this).attr('href'));
    });



    //select all the anchors in the navbar one after another
    $navbara.each(function () {
        // and adds them in the sections variable
        sections.push($($(this).attr('href')));

    })
    $(window).on('scroll', function (e) {
        // scrollTop retains the value of the scroll top with the reference at the middle of the page
        var scrollTop = $(this).scrollTop() + ($(window).height() / 2);
        
        //cycle through the values in sections array
        var scrolled_id = "";
        $('.page').each((index, element)=>{
            if (scrollTop > $(element).offset().top) {
                scrolled_id = $(element).attr('id');
            }
        });
        
        // for (var i in sections) {
        //     var section = sections[i];
        //     // console.log(section)
        //     //if scrollTop variable is bigger than the top offset of a section in the sections array then 
        //     if (scrollTop > section.offset().top) {
        //         var scrolled_id = section.attr('id');
        //         // break;
        //     }
        // }
        
        if (scrolled_id !== id) {
            id = scrolled_id;
            $($navbara).removeClass('current');
            $('#navi a[href="#' + id + '"]').addClass('current');
        }
    })
    hash = function (h) {
        if (history.pushState) {
            history.pushState(null, null, h);
        } else {
            location.hash = h;
        }
    }
})(jQuery);