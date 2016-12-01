var $ = require('jquery');
import templates from '../templates';
import configs from '../../configs';
import rest from '../../api/rest';
import store from '../../stores/store';
import alerts from '../../utilities/alerts';
import router from '../../router';
import sidebar from '../../components/sidebar';
import notifications from '../../components/notifications';
import activities from '../../components/activities';
import Cookies from 'js-cookie';
import baseController from '../baseController';

const final_dict = {
    dict: {},
    endpoint: "auth",
    name: "login",
    requireAuth: false,
    login: (data) => {
        if (data.code == 200){
            store.set("authKey", data.result.key);
            store.set("isAuth", true);
            Cookies.set('autorization', data.result.key, { expires: 7 });
            sidebar.render();
            notifications.render();
            activities.render();
            router.redirect("/");
        } else if (data.code == 402) {
            alerts.error("Activate your account before login");
        } else if (data.code == 403) {
            alerts.error("Your account has been suspended, please contact the support team for any questions");
        } else {
            alerts.error("Invalid Login");
        }
    }
};

$(document).on("initApp", function() {

    $('body').on('submit', '#f-login', function(e) {
        var username = $('#f-login').find("#username");
        var password = $('#f-login').find("#password");

        var errors = false;

        if (username.val().length < 3) {
            $('#f-login').find("#username-error").html('Username is at least 3 charaters').show();
            errors = true;
        } else {
            $('#f-login').find("#username-error").hide();
        }

        if (password.val().length < 6) {
            $('#f-login').find("#password-error").html('Password is at least 6 charaters').show();
            errors = true;
        } else {
            $('#f-login').find("#password-error").hide();
        }

        if (!errors) {

            //todo add captcha

            var data = {
                "username": username.val(),
                "password": password.val(),
                "captcha": undefined
            }

            rest.post("/auth/login/", data, false, final_dict.login);

        }

    });

    $('body').on('input', '#f-login #username', function(e) {
        var text = $('#f-login').find("#username").val();
        text = text.replace(/[^a-zA-Z0-9]+/g, '');
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

        if(text.length > 16) text = text.substring(0,16);

        $('#f-login').find("#username").val(text);
    });

    $('body').on('input', '#f-login #password', function(e) {
        var text = $('#f-login').find("#password").val();

        if(text.length > 24) text = text.substring(0,24);

        $('#f-login').find("#password").val(text);


    });
});

export default final_dict;