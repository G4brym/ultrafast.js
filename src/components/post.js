var $ = require('jquery');
import templates from '../controllers/templates';
import configs from '../configs';
import store from '../stores/store';
import rest from '../api/rest';

const final_dict = {
    name: "post",
    template: "components/post.html",
    dict: () => ($.extend({
    }, store.main())),
    compiled: null,
    render: (data, newPost) => {
        // sums the static dict with the input dict
        let dict = $.extend(final_dict.dict(), data);

        final_dict["compiled"] = templates.compileTemplate(final_dict["template"], dict, final_dict.name);
        $(document).on("controllerCallback-" + final_dict.name, function(event, compiled) {
            if (compiled.indexOf('<div class="post-hidden" style="display: none;">') == 1){
                $("#posts").prepend(compiled);
            } else {
                $("#posts").append(compiled);
            }
            $('#posts').find(".post-hidden:first").slideDown("slow");
        });
    },
    awesomePost: (data) => {
        if (data.code == 201 || data.code == 202){
            // Gets the post
            let tmp = $('#post-' + data.result.post_id);

            // Updates post counter
            tmp.find('#awesomes-counter').html(data.result.counter);

            // Enables the buton again
            tmp.find('#awesomePost').attr("disabled", false).attr("pressed", data.result.enabled);
        } else {
            alerts.error("An error occured, try again laters");
        }
    }
};

$(document).on("initApp", function() {

    $('body').on('click', '#awesomePost', function(e) {
        $(this).attr("disabled", true);
        let postID = $(this).parent().parent().attr("post-id");


        var errors = false;

        if (postID < 1) {
            errors = true;
        }

        if (!errors) {

            var data = {
                "id": postID
            }

            rest.post("/feed/awesome/", data, true, final_dict.awesomePost);

        }

    });

    $('body').on('click', '#commentButton', function(e) {
        $(this).parent().parent().find('#comments').slideToggle('fast');


    });
});

export default final_dict;