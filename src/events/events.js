var $ = require("jquery");
import router from "../router";

$(document).on("initApp", function() {
    $(window).on('hashchange', function() {
        router.detectRoute();
    });

    // Stops redirects
    $('body').on('click', 'a', function(e) {
        e.preventDefault();
        router.redirect($(this).attr('href'));
    });

    // Stops forms submits and redirects
    $('body').on('submit', 'form', function(e) {
      e.preventDefault();
    });
});