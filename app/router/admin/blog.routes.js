const express = require("express");
const routerLabel = require("route-label");
const BlogController = require("../../module/blog/controller/BlogController");
const { AuthAdmin } = require("../../middleware/auth");

const router = express.Router();
const namedRouter = routerLabel(router);

// namedRouter.get({AuthAdmin})

namedRouter.get(
  "blog-list",
  "/blog-list",
  AuthAdmin("admin"),
  BlogController.blogListPage
);
namedRouter.get(
  "blog-add-page",
  "/blog-add",
  AuthAdmin("admin"),
  BlogController.addBlogPage
);
namedRouter.get(
  "blog-edit-page",
  "/blog-edit/:id",
  AuthAdmin("admin"),
  BlogController.updateBlogPage
);
namedRouter.post("blog-create", "/blog/create", BlogController.createBlog);
namedRouter.post("blog-edit", "/blog/edit/:id", BlogController.updateBlog);
namedRouter.get("blog-delete", "/blog/delete/:id", BlogController.deleteBlog);

module.exports = router;
