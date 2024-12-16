const UserModel = require("../model/user");

const UserRepositories = {
  // User Registration
  userRegistration: async (data) => {
    try {
      const user = await UserModel.create(data);
      return user;
    } catch (err) {
      console.error("Error in userRegistration:", err.message);
      throw new Error("Database operation failed.");
    }
  },
};

module.exports = UserRepositories;
