const BlogModel = require("../../module/blog/model/BlogModel");
const BlogRepositories = require("../../module/blog/repositories/BlogRepositories");

class BlogApiController {
  // Get All Blog
  async getAllBlog(req, res) {
    try {
      const pages = parseInt(req.query.page) || 1;
      const { blog, page, prevPage, nextPage, totalPage, totalData } =
        await BlogRepositories.getAll(pages);
      res.status(200).json({
        status: true,
        message: "Blog fetched successfully.",
        count: totalData,
        page,
        totalPage,
        prevPage,
        nextPage,
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
