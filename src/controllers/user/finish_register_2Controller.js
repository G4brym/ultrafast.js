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
    endpoint: "user",
    name: "finish_register_2",
    requireAuth: true,
    finish_register_2: (data) => {
        // TODO: more errors
        if (data.code == 200){
            alerts.success("já ta");
            router.redirect("finish-register/1/");
        } else {
            alerts.error("An error occurred");
        }
    }
};

$(document).on("initApp", function() {

    $('body').on('submit', '#f-finish_register_2', function(e) {
        var first_name = $('#f-finish_register_2').find("#first_name");
        var last_name = $('#f-finish_register_2').find("#last_name");
        var country = $('#f-finish_register_2').find("#country");

        var errors = false;

        if (first_name.val().length < 2 || first_name.val().length > 16) {
            $('#f-finish_register_2').find("#first_name-error").html('Please enter a valid name').show();
            errors = true;
        } else {
            $('#f-finish_register_2').find("#first_name-error").hide();
        }

        if (last_name.val().length < 2 || last_name.val().length > 16) {
            $('#f-finish_register_2').find("#last_name-error").html('Please enter a valid name').show();
            errors = true;
        } else {
            $('#f-finish_register_2').find("#last_name-error").hide();
        }

        if (country.val() == "00") {
            $('#f-finish_register_2').find("#country-error").html('Select a country').show();
            errors = true;
        } else {
            $('#f-finish_register_2').find("#country-error").hide();
        }

        if (!errors) {

            //todo add captcha

            var data = {
                "first_name": first_name.val(),
                "last_name": last_name.val(),
                "country": country.val(),
                "captcha": undefined
            }

            rest.post("/user/finish_register_2/", data, true, final_dict.finish_register_2);

        }

    });

    $('body').on('change', '#f-finish_register_2 #country', function(e) {
        var country = $('#f-finish_register_2').find("#country").val();
        if (country == "00"){
            $('#f-finish_register_2').find("#country-error").html("Select a valid country").show();
        } else {
            $('#f-finish_register_2').find("#country-error").hide();
        }
    });
});

export default final_dict;