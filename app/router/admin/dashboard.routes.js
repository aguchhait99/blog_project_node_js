const express = require("express");
const routerLabel = require("route-label");
const HomeController = require("../../module/home/controller/HomeController");

const router = express.Router();
const namedRouter = routerLabel(router);

namedRouter.get("dashboard", "/", HomeController.dashboard);

module.exports = router;
