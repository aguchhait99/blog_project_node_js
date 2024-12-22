const { hashPassword, comparePassword } = require("../../helper/commonHelper");
const UserModel = require("../../module/auth/model/user");
const UserRepositories = require("../../module/auth/repositories/UserRepositories");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

class AuthController {
  // User registration
  async userRegistration(req, res) {
    try {
      const { name, email, password } = req.body;

      // Check for missing fields
      if (!name || !email || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }

      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          status: false,
          message: "Email already exists.",
        });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Prepare user data
      const data = {
        name: name,
        email: email,
        password: hashedPassword,
        image: req?.file ? req.file?.path : null, 
      };
      // Save user
      const user = await UserRepositories.userRegistration(data);

      // Check if user creation failed
      if (!user) {
        return res.status(500).json({
          status: false,
          message: "Failed to register user. Please try again.",
        });
      }

      // Successful response
      return res.status(201).json({
        status: true,
        message: "User registered successfully.",
        data: {
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    } catch (err) {
      console.error("Error in user registration: ", err.message);
      return res.status(500).json({
        status: false,
        message: "Internal server error. Please try again later.",
        error: err.message,
      });
    }
  }

  //   User Login
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          status: false,
          message: "All fields are required.",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "User not found",
        });
      }
      const isMatchPassword = await comparePassword(password, user.password);
      if (!isMatchPassword) {
        return res.status(400).json({
          status: false,
          message: "Invalid credentials",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        status: true,
        message: "User login successfully",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
        token: token,
      });
    } catch (err) {
      console.error("Error in user login: ", err.message);
      res.status(500).json({
        status: false,
        message: "Internal server error. Please try again later.",
        error: err.message,
      });
    }
  }
}

module.exports = new AuthController();
