const BlogModel = require("../model/BlogModel");

const BlogRepositories = {
  // Get all Blog
  getAll: async (page) => {
    try {
      const limit = 5;
      const totalData = await BlogModel.countDocuments({ isDelete: { $ne: true } });
      const totalPage = Math.ceil(totalData / limit);
      const nextPage = page < totalPage ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const blog = await BlogModel.find({ isDelete: { $ne: true } })
        .skip((page - 1) * limit)
        .limit(limit);
      if (!blog) {
        return null;
      }
      return { blog, page, prevPage, nextPage, totalPage, totalData };
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

  // Soft Delete Blog
  softDelete: async (id) => {
    try {
      const blog = await BlogModel.findByIdAndUpdate(id, { isDelete: true });
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
