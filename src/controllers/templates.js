var $ = require('jquery');
var handlebars = require('handlebars');
require('./handlebars-helpers');
import configs from '../configs';

const downloaded_templates = {}

const templates = {
    compileTemplate: (template, dict, name) => {
        if (template in downloaded_templates) {
            var tmp = handlebars.compile(downloaded_templates[template])(dict);
            $(document).trigger("controllerCallback-" + name, [ tmp ] );
            return tmp;
        } else {
            var template_html = $.get(configs.genTemplateUrl(template), (data) => {
                downloaded_templates[template] = data;
                var tmp = handlebars.compile(data)(dict);
                $(document).trigger("controllerCallback-" + name, [ tmp ] );
                return  tmp;
            });
        }
    }
};

export default templates;