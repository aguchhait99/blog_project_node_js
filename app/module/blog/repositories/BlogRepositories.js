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

  // Update Blog
  edit: async (id, data) => {
    try {
      const blog = await BlogModel.findByIdAndUpdate(id, {
        title: data.title,
        author: data.author,
        content: data.content,
      });
      if (!blog) {
        return null;
      }
      return blog;
    } catch (err) {
      console.log(err);
    }
  },

  // Delete Blog
  delete: async (id) => {
    try {
      const blog = await BlogModel.findByIdAndDelete(id);
      if (!blog) {
        return null;
      }
      return blog;
    } catch (err) {
      console.log(err);
    }
  },

  // SIngle Blog Data
  singleDetails: async (id) => {
    try {
      const blog = await BlogModel.findById(id);
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
