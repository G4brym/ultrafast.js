var $ = require('jquery');
import templates from './templates';
import configs from '../configs';
import rest from '../api/rest';
import store from '../stores/store';
import alerts from '../utilities/alerts';
import router from '../router';
import sidebar from '../components/sidebar';
import notifications from '../components/notifications';
import activities from '../components/activities';
import Cookies from 'js-cookie';
import post from '../components/post';
import baseController from './baseController';

const final_dict = {
    dict: {},
    endpoint: "",
    name: "index",
    requireAuth: true,
    newPost: (data) => {
        if (data.code == 200){
            // todo: this post is going to the bottom, take it up
            post.render(data.result);
        } else {
            alerts.error("An error occured, try again laters");
        }
    },
    displayPosts: (data) => {
        if (data.code == 200){
            post.render(data.result);
        } else {
            alerts.error("An error occured, try again laters");
        }
    }
};

$(document).on("postRender-" + final_dict.name, function() {
    // todo: add last post id to data

    rest.get("/feed/posts/", {}, true, final_dict.displayPosts);
});

$(document).on("initApp", function() {

    $('body').on('click', '#newPost-submit', function(e) {
        var text = $('#newPost-text');

        var errors = false;

        if (text.html().length < 1) {
            errors = true;
        }

        if (!errors) {
            //todo add captcha

            var data = {
                "text": $.trim(text.html()),
                "captcha": undefined
            }

            rest.post("/feed/post/", data, true, final_dict.newPost);

        }

    });
});

export default final_dict;