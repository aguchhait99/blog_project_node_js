const express = require("express");
const routerLabel = require("route-label");
const BlogApiController = require("../../webservice/blog/BlogApiController");
const router = express.Router();
const namedRouter = routerLabel(router);

namedRouter.get("allBlog", "/all-blog", BlogApiController.getAllBlog);

module.exports = router;
