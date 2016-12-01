//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//

import router from "./router";
import sidebar from './components/sidebar';
import notifications from './components/notifications';
import activities from './components/activities';
import Cookies from 'js-cookie';
import store from './stores/store';
import rest from './api/rest';
import alerts from './utilities/alerts';

//Dependencies Inject
require("./template");
global.jQuery = require('jquery');
global.$ = require('jquery');
var bootstrap = require("bootstrap");

//Starts all events
require("./events/events");

//Register all routes
require('./registry');

//Removes mobile clients click lag
var attachFastClick = require('fastclick');
attachFastClick(document.body);

//Check if the user is authenticated
var autorization = Cookies.get('autorization');
if(autorization != undefined){
    rest.post("/auth/authkey/", {"authkey": autorization}, true, (data) => {
        if (data.code == 200){
            //Stores user data + authkey
            store.set("authKey", autorization);
            store.set("isAuth", true);
            store.set("user", data.result.user);
            //Fire The App
            $.when( router.detectRoute() ).done(() => {
                $(document).trigger("initApp");
                sidebar.render();
                notifications.render();
                activities.render();
            });
        } else {
            alerts.error("An error occured, try again laters");
        }
    });
} else {
    $.when( router.detectRoute() ).done(() => {
        $(document).trigger("initApp");
        sidebar.render();
        notifications.render();
        activities.render();
    });
}