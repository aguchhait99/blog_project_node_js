const express = require("express");
const routerLabel = require("route-label");
const HomeController = require("../../module/home/controller/HomeController");
const { AuthAdmin } = require("../../middleware/auth");

const router = express.Router();
const namedRouter = routerLabel(router);

namedRouter.get("dashboard", "/", AuthAdmin("admin"), HomeController.dashboard);

module.exports = router;
