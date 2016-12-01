var $ = require('jquery');
import templates from '../templates';
import configs from '../../configs';
import store from '../../stores/store';
import rest from '../../api/rest';
import router from '../../router';
import alerts from '../../utilities/alerts';
import validation from '../../utilities/validation';
import baseController from '../baseController';

const final_dict = {
    dict: {},
    endpoint: "auth",
    name: "activate",
    requireAuth: false,
    activate: (data) => {
        if (data.code == 200){
            alerts.success("Your Account is now activate, you may login now");
            router.redirect("/");
        } else if (data.code == 406){
            alerts.error("Invalid Token");
        } else {
            alerts.error("An error occurred");
        }
    }
};

$(document).on("postRender", function() {
    var token = $('#f-activate').find("#token");

    // Check if var token is set
    let token_parsed = $.urlParam('token');

    // If it is set, then set the textbox to that value
    if (token_parsed != null){
        token.val(token_parsed);
    }

});

$(document).on("initApp", function() {

    $('body').on('submit', '#f-activate', function(e) {
        var token = $('#f-activate').find("#token");

        var errors = false;

        if (token.val().length != 64) {
            $('#f-activate').find("#token-error").html('Invalid Token').show();
            errors = true;
        } else {
            $('#f-login').find("#username-error").hide();
        }

        if (!errors) {

            //todo add captcha

            var data = {
                "token": token.val(),
                "captcha": undefined
            }

            rest.post("/auth/activate/", data, false, final_dict.activate);

        }

    });
});

export default final_dict;