const configs = {
    "frontend": "http://that.g4brym.ovh:1234", // Without backslash
    "backend": "http://be.g4brym.ovh/v1", // Without backslash
    genUrl: (url) => {
        return configs.frontend + "/#!" + url;
    },
    genTemplateUrl: (template) => {
        return configs.frontend + "/templates/" + template;
    },
    genBEUrl: (url) => configs.backend + url,
    "renderTag": "#root"
}

export default configs;