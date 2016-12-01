var $ = require('jquery');
import templates from '../controllers/templates';
import configs from '../configs';
import store from '../stores/store';
import rest from '../api/rest';

const final_dict = {
    name: "user_badge",
    template: "components/user_badge.html",
    dict: () => ($.extend({
    }, store.main())),
    compiled: null,
    render: (data) => {
        // sums the static dict with the input dict
        let dict = $.extend(final_dict.dict(), data);

        final_dict["compiled"] = templates.compileTemplate(final_dict["template"], dict, final_dict.name);
        $(document).on("controllerCallback-" + final_dict.name, function(event, compiled) {
            $("#users").append(compiled);
            $('#users').find(".post-hidden:first").slideDown("slow");
        });
    }
};

$(document).on("initApp", function() {

});

export default final_dict;