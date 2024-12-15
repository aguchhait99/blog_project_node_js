const express = require("express");
const routerLabel = require("route-label");
const BlogController = require("../../module/blog/controller/BlogController");

const router = express.Router();
const namedRouter = routerLabel(router);

namedRouter.get("blog-list", "/blog-list", BlogController.blogListPage);
namedRouter.get("blog-add-page", "/blog-add", BlogController.addBlogPage);
namedRouter.post("blog-create", "/blog/create", BlogController.createBlog);

module.exports = router;
