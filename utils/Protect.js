const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const util = require("util");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "../config/config.env" });
const { protectMessages, success, fail } = require("../utils/Constants");

exports.Protect = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      let decoded = await util.promisify(jwt.verify)(token, process.env.LOGIN_TOKEN);
      let freshUser = await User.findByPk(decoded.id);
      if (!freshUser) {
        res.status(401).json({
          status: fail,
          message: protectMessages.userFind,
        });
      }
      req.user = freshUser;
      next();
    } else {
      res.status(403).json({
        status: fail,
        message: protectMessages.login,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: fail,
      message: err.message,
    });
  }
};
