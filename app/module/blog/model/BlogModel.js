const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      requre: true,
    },
    content: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "Active",
      require: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BlogModel = mongoose.model("blog", blogSchema);
module.exports = BlogModel;
