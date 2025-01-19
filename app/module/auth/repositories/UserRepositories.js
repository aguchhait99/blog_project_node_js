const { UserModel } = require("../model/user");

const UserRepositories = {
  // User Registration
  userRegistration: async (data) => {
    try {
      const user = await UserModel.create(value);
      return user;
    } catch (err) {
      console.error("Error in userRegistration:", err.message);
      throw new Error("Database operation failed.");
    }
  },

  userDelete: async (id) => {
    try {
      const user = await UserModel.findByIdAndDelete({ id });
      return user;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = UserRepositories;
