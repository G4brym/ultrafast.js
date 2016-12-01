var $ = require("jquery");
var cookie = require('js-cookie');
import configs from '../configs';

const rest = {
    get_authorization: () => {
        let tmp = cookie.get('autorization');

        return {
            "first": tmp.substr(0, 64),
            "second": tmp.substr(64)
        }
    },
    post: (url, data, auth, func) => {
        var callback = new Date().getTime();

        window[callback] = (data) => func(data);

        $.ajax({
            type: "POST",
            url: configs.genBEUrl(url) + "?callback=" + callback,
            headers: {
                // todo: optimize this
                'Authorization-1': auth ? rest.get_authorization()["first"] : "",
                'Authorization-2': auth ? rest.get_authorization()["second"] : "",
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function(responseData, status, xhr) {
                window[responseData["callback"]](responseData);
            },
            error: function(request, status, error) {
                window[request.responseJSON["callback"]](request.responseJSON);
            }
        });
    },
    get: (url, data, auth, func) => {
        var callback = new Date().getTime();

        window[callback] = (data) => func(data);

        data["callback"] = callback;

        let final_url_parameters = "";

        // Convert dict to url parameters
        for (var key in data) {
            final_url_parameters += key + "=" + data[key] + "&";
        }

        $.ajax({
            type: "GET",
            url: configs.genBEUrl(url),
            headers: {
                // todo: optimize this
                'Authorization-1': auth ? rest.get_authorization()["first"] : "",
                'Authorization-2': auth ? rest.get_authorization()["second"] : "",
                'Content-Type': 'application/json'
            },
            crossDomain: true,
            data: final_url_parameters,
            dataType: 'json',
            success: function(responseData, status, xhr) {
                window[responseData["callback"]](responseData);
            },
            error: function(request, status, error) {
                window[request.responseJSON["callback"]](request.responseJSON);
            }
        });
    }
};

export default rest;