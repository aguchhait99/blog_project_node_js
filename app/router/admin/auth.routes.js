const express = require("express");
const router = express.Router();
const routerLabel = require("route-label");
const UserController = require("../../module/auth/controller/UserController");
const namedRouter = routerLabel(router);

namedRouter.get("login-page", "/signin", UserController.loginPage);
namedRouter.post("login", "/user-signin", UserController.userLogin);
namedRouter.get("logout", "/user-logout", UserController.logout);

module.exports = router;
