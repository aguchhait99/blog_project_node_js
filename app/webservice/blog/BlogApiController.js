const BlogRepositories = require("../../module/blog/repositories/BlogRepositories");

class BlogApiController {
  // Get All Blog
  async getAllBlog(req, res) {
    try {
      const blog = await BlogRepositories.getAll();
      res.status(200).json({
        status: true,
        message: "Blog fetched successfully.",
        count: blog.length,
        data: blog,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Get Single Blog
  async getSingleBlog(req, res) {
    try {
      const id = req.params.id;
      const blog = await BlogRepositories.singleDetails(id);
      if (blog) {
        res.status(200).json({
          status: true,
          message: "Single blog fetched successfully.",
          data: blog,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BlogApiController();
