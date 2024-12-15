const BlogModel = require("../model/BlogModel");

const BlogRepositories = {
  // Get all Blog
  getAll: async () => {
    try {
      const blog = await BlogModel.find();
      if (!blog) {
        return null;
      }
      return blog;
    } catch (err) {
      console.log(err);
    }
  },

  // Create Blog
  create: async (data) => {
    try {
      const blog = await BlogModel.create(data);
      if (!blog) {
        return null;
      }
      return blog;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = BlogRepositories;
