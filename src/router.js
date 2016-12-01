var $ = require("jquery");
var postRender = require("./utilities/postRender");
import baseController from './controllers/baseController';
import store from './stores/store';

let routes = {}
let currentRoute = ""

const router = {
    init: () => {
        let currentHash = window.location.hash;

        if (!currentHash.startsWith("#!/")){
            this.redirect("/");
        }
    },
    register: (name, url, controller) => {
        let tmp = "#!" + url
        routes[tmp] = {
            "name": name,
            "required_auth": controller.require_auth,
            "controller": controller
        }
    },
    currentRoute: () => routes[currentRoute],
    redirect: (url) => {
        if (url != undefined) {
            let tmp = "#!" + url;
            window.location.hash = tmp;
        }
    },
    detectRoute: () => {
        let currentHash = window.location.hash;

        // Remove all url vars
        currentHash = currentHash.split("?")[0];

        if (currentHash.slice(-1) != "/"){
            currentHash += "/";
            return router.redirect(currentHash);
        }

        if (!currentHash.startsWith("#!/")){
            // Removes everything behind the first /
            let tmp = currentHash.substring(currentHash.indexOf('/'));

            return router.redirect(tmp);

        } else if (currentHash in routes){

            currentRoute = currentHash;

        } else {

            return router.redirect("/404-notfound/");
        }

        // Checks if the view requires auth
        if (router.currentRoute().controller.default.requireAuth && !store.isAuth()){
            return router.redirect("/login/");
        }


        console.log("render " + currentRoute);
        baseController.render(router.currentRoute().controller.default);
        postRender.default(router.currentRoute().controller.default.name);
    },
    genURL: (url) => { return "#!" + url; }
};

export default router;