var $ = require('jquery');
import templates from '../controllers/templates';
import configs from '../configs';
import store from '../stores/store';

const final_dict = {
    name: "sidebar",
    template: "components/sidebar.html",
    dict: () => ($.extend({
        "links": [{"name": "inicio", "link": "#!/"}, {"name": "settings", "link": "#!/ola/"}],
    }, store.main())),
    compiled: null,
    render: () => {
        final_dict["compiled"] = templates.compileTemplate(final_dict["template"], final_dict.dict(), final_dict.name);
        $(document).on("controllerCallback-" + final_dict.name, function(event, compiled) {
            $("#sidebar").html(compiled);
        });
    }
};


export default final_dict;