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
    name: "register",
    requireAuth: false,
    register: (data) => {
        // TODO: more errors
        if (data.code == 200){
            alerts.success("Check your email and confirm your account");
            router.redirect("/");
        } else {
            alerts.error("An error occurred");
        }
    }
};

$(document).on("initApp", function() {

    $('body').on('submit', '#f-register', function(e) {
        var username = $('#f-register').find("#username");
        var email = $('#f-register').find("#email");
        var password = $('#f-register').find("#password");
        var password_confirm = $('#f-register').find("#password_confirm");
        var terms = $('#f-register').find("#terms");

        var errors = false;

        if (username.val().length < 3) {
            $('#f-register').find("#username-error").html('Username is at least 3 charaters').show();
            errors = true;
        } else {
            $('#f-register').find("#username-error").hide();
        }

        if ((email.val().length < 3) || (!validation.validateEmail(email.val()))) {
            $('#f-register').find("#email-error").html('Email is not valid').show();
            errors = true;
        } else {
            $('#f-register').find("#email-error").hide();
        }

        if (password.val().length < 6) {
            $('#f-register').find("#password-error").html('Password is at least 6 charaters').show();
            errors = true;
        } else {
            $('#f-register').find("#password-error").hide();
        }

        if ((password_confirm.val() != password.val()) || (password_confirm.val().length < 6)) {
            $('#f-register').find("#password_confirm-error").html('Passwords doesn´t match').show();
            errors = true;
        } else {
            $('#f-register').find("#password_confirm-error").hide();
        }

        if (!terms.is(":checked")) {
            $('#f-register').find("#terms-error").html('Accept terms before proceed').show();
            errors = true;
        } else {
            $('#f-register').find("#password_confirm-error").hide();
        }

        if (!errors) {

            //todo add captcha

            var data = {
                "username": username.val(),
                "email": email.val(),
                "password": password.val(),
                "password_confirm": password_confirm.val(),
                "terms": terms.is(":checked"),
                "captcha": undefined
            }

            rest.post("/auth/register/", data, false, final_dict.register);

        }

    });

    $('body').on('input', '#f-register #username', function(e) {
        var text = $('#f-register').find("#username").val();
        text = text.replace(/[^a-zA-Z0-9]+/g, '');
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        if(text.length > 16) text = text.substring(0,16);

        $('#f-register').find("#username").val(text);
    });

    $('body').on('input', '#f-register #password', function(e) {
        var text = $('#f-register').find("#password").val();

        if(text.length > 24) text = text.substring(0,24);

        $('#f-register').find("#password").val(text);


    });

    $('body').on('input', '#f-register #password_confirm', function(e) {
        var text = $('#f-register').find("#password_confirm").val();

        if(text.length > 24) text = text.substring(0,24);

        $('#f-register').find("#password_confirm").val(text);


    });
});

export default final_dict;