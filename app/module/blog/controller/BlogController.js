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

  // Update Blog
  async updateBlogPage(req, res) {
    try {
      const id = req.params.id;
      const blog = await BlogRepositories.singleDetails(id);
      res.render("blog/edit", {
        data: blog,
      });
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

  // Edit Blog
  async updateBlog(req, res) {
    try {
      const id = req.params.id;
      const data = await BlogRepositories.edit(id, req.body);
      if (data) {
        res.redirect(namedRouter.urlFor("blog-list"));
      } else {
        res.redirect(namedRouter.urlFor("blog-edit-page", { id: id }));
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Delete
  async deleteBlog(req, res) {
    try {
      const id = req.params.id;
      const data = await BlogRepositories.delete(id);
      if (data) {
        res.redirect(namedRouter.urlFor("blog-list"));
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BlogController();
