$(document).ready(function () {
    // Detect Media & Handle Responsive 
    let desktopMedia = window.matchMedia("(min-width: 768px)");
    detectMedia(desktopMedia) // Call listener function at run time
    desktopMedia.addListener(detectMedia) // Attach listener function on state changes
    function detectMedia(desktopMedia) {
        if (desktopMedia.matches) {
            //Monica
            if ($(".service-requests-section").hasClass("full-height")) {
                $(".tickets-accordion__body").addClass("inline");
                showFullHeight();
            } else {
                initSwiper();
            }
            showAllTickets();
        } else {
            handleShowMoreBtn();
        }
    }
    //this function for showing all tickets before init swiper to fix resizing issue
    function showAllTickets() {
        $('.tickets-accordion__ticket-card').show();
    }
    function showFullHeight() {
        var count = 3;
        if ($(window).width() > 1400) { count = 8 }
    
        else if ($(window).width() > 1200) { count = 5 }
        else if ($(window).width() > 992) { count = 3 }
        $(".swiper-wrapper").each(function () {
            if ($(this).find(".swiper-slide").length > count) {
                $(this).find(".swiper-slide").show(5);
                $(this).find(".swiper-slide:nth-child(n+" + (count + 1) + ")").hide(5);
                $(this).find(".swiper-slide.more").remove();
                $(this).append("<div class='swiper-slide tickets-accordion__ticket-card open more'>" +
                    "and <span class='count'>" +
                    ( $(this).find(".swiper-slide:not('.more')").length - count )+
                    "</span> more tickets in service requests page." +
                    "<a href='javascript:void(0);' class='view-all'>view all <span class='icon-right-arrow'></span>" +
                    "</a></div>");
            }
        });
    }
    $(window).resize(function () {
        showFullHeight();
    });
    // Initialize Swiper
    function initSwiper() {
        let op_swiper = new Swiper('.opened-tickets-swiper', {
            spaceBetween: 8,
            speed: 500,
            slidesPerView: 3,
            loadPrevNext: true,
            navigation: {
                nextEl: '.swiper-button-next.open',
                prevEl: '.swiper-button-prev.open',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1250: {
                    slidesPerView: 3
                }
            },
            on: {
                observerUpdate: function () {
                    op_swiper.slideTo(0);
                }
            }
        });
        let cl_swiper = new Swiper('.closed-tickets-swiper', {
            spaceBetween: 8,
            speed: 500,
            slidesPerView: 3,
            navigation: {
                nextEl: '.swiper-button-next.closed',
                prevEl: '.swiper-button-prev.closed',
            },
            observer: true,
            observeParents: true,
            breakpoints: {
                768: {
                    slidesPerView: 2
                },
                1250: {
                    slidesPerView: 3
                }
            }
        });
        document.getElementById("service-request__form").addEventListener(
            "submit",
            function (event) {
                event.preventDefault();
                var d = new Date($.now());
                var hours = d.getHours() % 12;
                hours = hours ? hours : 12;
                var time = d.getHours() >= 12 ? 'PM' : 'AM';
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                op_swiper.prependSlide([
                    "<div class='swiper-slide tickets-accordion__ticket-card open swiper-slide-active added'>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--title'>" +
                    "<i class='icon-tickets'></i>" +
                    $("#service-request__form [placeholder='Details']").val() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--elevator'>" +
                    $("#service-request__form #unit option:selected").text() +
                    "<br/>" +
                    23890487 +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--location'>" +
                    "<i class='icon-location'></i> " +
                    $("#service-request__form #location option:selected").text() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time first'><span>Created:</span> <b>" +
                    hours + ":" + d.getMinutes() + time + " " + d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear() + " " +
                    "</b>" +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time'><span>Updated:</span> <b>" +
                    "New" +
                    "</b>" +
                    "</div>" +
                    "</div>"
                ]);
                setTimeout(
                    function () {
                        $(".swiper-slide").removeClass("added");
                    }, 2000);
                $(this).trigger("reset");
                $('.tickets-accordion__header-counter--open').html(parseInt($('.tickets-accordion__header-counter--open').html(), 10) + 1);
            }
        );
    }
    // Prevent accordion from closing itself & keep at least one opened
    $('[data-toggle="collapse"]').on('click', function (e) {
        if ($(this).parents('.accordion').find('.collapse.show')) {
            var idx = $(this).index('[data-toggle="collapse"]');
            if (idx == $('.collapse.show').index('.collapse')) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
    });
    // Handling open closed tickets on mobile
    $('#headingTwo2').on('click', function (e) {
        if (!desktopMedia.matches) {
            $('html, body').animate({
                scrollTop: $('#collapseTwo2').offset().top
            }, 500);
        }
    })
    // Handling Load More functionality
    function handleShowMoreBtn() {
        let open_clicks = 0;
        let closed_clicks = 0;
        // Show more open tickets
        if ($('.tickets-accordion__ticket-card.open').length > 3) {
            $('#show-more-open').show();
            $('.tickets-accordion__ticket-card.open:gt(2)').hide();
            $('#show-more-open button').on('click', function () {
                switch (open_clicks) {
                    case 0:
                        $('.tickets-accordion__ticket-card.open').slice(2, 6).show();
                        ++open_clicks;
                        break;
                    case 1:
                        $('.tickets-accordion__ticket-card.open').slice(6).show();
                        ++open_clicks;
                        break;
                    case 2:
                        confirm("Go to Service Requests Page!");
                        break;
                }
            });
        }
        // Show more closed tickets
        if ($('.tickets-accordion__ticket-card.closed').length > 3) {
            $('#show-more-closed').show();
            $('.tickets-accordion__ticket-card.closed:gt(2)').hide();
            $('#show-more-closed button').on('click', function () {
                switch (closed_clicks) {
                    case 0:
                        $('.tickets-accordion__ticket-card.closed').slice(2, 6).show();
                        ++closed_clicks;
                        break;
                    case 1:
                        $('.tickets-accordion__ticket-card.closed').slice(6).show();
                        ++closed_clicks;
                        break;
                    case 2:
                        confirm("Go to Service Requests Page!");
                        break;
                }
            });
        }
    }
    //adding item to full-height component
    document.getElementById("service-request__form").addEventListener(
        "submit",
        function (event) {
            event.preventDefault();
            if ($(".service-requests-section").hasClass("full-height")) {
                var d = new Date($.now());
                var hours = d.getHours() % 12;
                hours = hours ? hours : 12;
                var time = d.getHours() >= 12 ? 'PM' : 'AM';
                const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                $("#opened-tickets-collapse .swiper-wrapper").prepend(
                    "<div class='swiper-slide tickets-accordion__ticket-card open swiper-slide-active added'>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--title'>" +
                    "<i class='icon-tickets'></i>" +
                    $("#service-request__form [placeholder='Details']").val() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--elevator'>" +
                    $("#service-request__form #unit option:selected").text() +
                    "<br/>" +
                    23890487 +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--location'>" +
                    "<i class='icon-location'></i> " +
                    $("#service-request__form #location option:selected").text() +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time first'><span>Created:</span> <b>" +
                    hours + ":" + d.getMinutes() + time + " " + d.getDate() + "-" + monthNames[d.getMonth()] + "-" + d.getFullYear() + " " +
                    "</b>" +
                    "</div>" +
                    "<div class='tickets-accordion__ticket-info tickets-accordion__ticket-info--time'><span>Updated:</span> <b>" +
                    "New" +
                    "</b>" +
                    "</div>" +
                    "</div>"
                );
                showFullHeight();
                setTimeout(
                    function () {
                        $(".swiper-slide").removeClass("added");
                    }, 2000);
                $(this).trigger("reset");
            }
        }
    );
});