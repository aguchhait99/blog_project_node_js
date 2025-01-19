const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const routerLabel = require("route-label");
const namedRouter = routerLabel(router);
const SECRET_KEY = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;

const AuthApi = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(400).json({
      message: "Token is required for access this page",
    });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }
  return next();
};

const AuthAdmin = (role) => async (req, res, next) => {
  try {
    const tokenName = role === "admin" ? "adminToken" : "authorToken";

    if (!req.cookies || !req.cookies[tokenName]) {
      return res.redirect(namedRouter.urlFor("login-page"));
    }

    // Verify the token
    const token = req.cookies[tokenName];
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.redirect(namedRouter.urlFor("login-page"));
      }

      req[role] = decoded;
      return next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
  }
};

module.exports = { AuthApi, AuthAdmin };
