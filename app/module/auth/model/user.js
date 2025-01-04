const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi");

const UserValidationSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().required().email({ minDomainSegments: 2 }),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$")),
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "author", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel, UserValidationSchema };
