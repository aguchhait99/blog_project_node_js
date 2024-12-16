const express = require("express");
const router = express.Router();
const routerLabel = require("route-label");
const AuthController = require("../../webservice/auth/AuthController");
const ImageUpload = require("../../helper/imageUpload");
const namedRouter = routerLabel(router);

namedRouter.post(
  "user-registration",
  "/user-registration",
  ImageUpload.single("image"),
  AuthController.userRegistration
);
namedRouter.post("user-login", "/user-login", AuthController.userLogin);

module.exports = router;
