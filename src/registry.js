var indexController = require('./controllers/indexController');
var registerController = require('./controllers/auth/registerController');
var finish_register_0Controller = require('./controllers/user/finish_register_0Controller');
var finish_register_1Controller = require('./controllers/user/finish_register_1Controller');
var finish_register_2Controller = require('./controllers/user/finish_register_2Controller');
var loginController = require('./controllers/auth/loginController');
var activateController = require('./controllers/auth/activateController');



import router from "./router";

router.register("index", "/", indexController);
router.register("register", "/register/", registerController);
router.register("finish_register_0", "/finish-register/0/", finish_register_0Controller);
router.register("finish_register_1", "/finish-register/1/", finish_register_1Controller);
router.register("finish_register_2", "/finish-register/2/", finish_register_2Controller);
router.register("login", "/login/", loginController);
router.register("activate", "/activate/", activateController);