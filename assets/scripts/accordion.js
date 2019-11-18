$(document).ready(function () {
    $(".accordion-body").hide();
    $(".accordion-section").first().addClass("open");
    $(".accordion-section").first().children(".accordion-body").slideDown();
    $(".accordion-header").click(function () {
        if (!$(this).parent(".accordion-section").hasClass("open")) {
            $(".accordion-body").slideUp();
            $(".accordion-section").removeClass("open");
            $(this).siblings(".accordion-body").slideDown();
            $(this).parent(".accordion-section").addClass("open");
        }
    });
});