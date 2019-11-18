$(document).ready(function() {
  $(".otis-nav__toggle").click(function() {
    //toggle icon-bar
    $(this).toggleClass("change");
    $(".otis-nav__items").toggleClass("change-toggle");

   });

  //toogle active link
  $("li.otis-nav__link").click(function() {
    $(this).addClass("active-link").siblings().removeClass("active-link");

    //hide red notification circle
    $(".otis-nav__notification-alert").hide();
  });

  //toggle notifications
  $(".otis__notifications,.otis-nav__notifications-close").click(function() {
    $(".otis-nav__notifications-items").toggleClass("toogle-notifications");
  });
  
  // hide notification when click pages link
  $("li.otis-nav__link:not(:first-child)").click(function() {
    $(".otis-nav__notifications-items").addClass("toogle-notifications");
  });
});
