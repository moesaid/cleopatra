$(function() {
  "use strict";
  // Toggle Submenu
  $(".toggle-submenu").on("click", function() {
    $(this)
      .toggleClass("active")
      .find(".fa-angle-right")
      .toggleClass("down");
    $(this)
      .next(".child-links")
      .slideToggle();
  });

});