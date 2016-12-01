var $ = require('jquery');
import templates from '../templates';
import configs from '../../configs';
import store from '../../stores/store';
import rest from '../../api/rest';
import router from '../../router';
import alerts from '../../utilities/alerts';
import validation from '../../utilities/validation';
import user_badge from '../../components/user_badge';
import baseController from '../baseController';

const final_dict = {
    dict: {},
    endpoint: "user",
    name: "finish_register_1",
    requireAuth: true,
    displayUsers: (data) => {
        if (data.code == 200){
            user_badge.render(data.result);
        } else {
            alerts.error("An error occured, try again laters");
        }
    },
    finish_register_1: (data) => {
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

});

export default final_dict;