const BlogRepositories = require("../repositories/BlogRepositories");
const express = require("express");
const routerLabel = require("route-label");
const router = express.Router();
const namedRouter = routerLabel(router);

class BlogController {
  // Blog List Page
  async blogListPage(req, res) {
    try {
      const blogData = await BlogRepositories.getAll();
      res.render("blog/list", {
        data: blogData,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Create Blog Page
  async addBlogPage(req, res) {
    try {
      res.render("blog/add");
    } catch (err) {
      console.log(err);
    }
  }

  //   Create Blog
  async createBlog(req, res) {
    try {
      const data = await BlogRepositories.create(req.body);
      if (data) {
        res.redirect(namedRouter.urlFor("blog-list"));
      } else {
        res.redirect(namedRouter.urlFor("blog-add-page"));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BlogController();
