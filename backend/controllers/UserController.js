const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = class UserController {
  signup(userName) {
    const token = jwt.sign({ userName: userName }, process.env.TOKEN_KEY, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return new User(userName, token);
  }
};
