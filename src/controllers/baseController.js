var $ = require('jquery');
import templates from './templates';
import configs from '../configs';
import store from '../stores/store';
import rest from '../api/rest';
import router from '../router';
import alerts from '../utilities/alerts';
import validation from '../utilities/validation';

const final_dict = {
    compiled: null,
    render: (dict) => {
        let template_loc = dict.endpoint == "" ? dict.name + ".html" : dict.endpoint + "/" + dict.name + ".html";
        final_dict["compiled"] = templates.compileTemplate(template_loc, $.extend(store.main(), dict.dict), dict.name);
        $(document).on("controllerCallback-" + dict.name, function(event, compiled) {
            $(configs.renderTag).html(compiled);
        });
    }
}

export default final_dict;