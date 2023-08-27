const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const crypto = require("crypto");
const dotenv = require("dotenv");
const { success, fail } = require("../utils/Constants");
const { transporter } = require("../utils/nodemailer");
// const apiFeatures = require("../utils/apiFeatures");

// Load env vars
dotenv.config({ path: "./config/config.env" });

module.exports = {
  createUser: async (req, res) => {
    try {
      const {
        title,
        firstname,
        lastname,
        dob,
        phonenumber,
        secondaryPhonenumber,
        email,
        password,
        newsletter,
      } = req.body;
      let data = {
        title,
        firstname,
        lastname,
        dob,
        phonenumber,
        secondaryPhonenumber,
        email,
        password,
        newsletter,
      };
      const newSignup = await User.create(data);
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: req.body.email,
        subject: "Welcome to pay fee!",
        text: "Thank you for signing up on pay fee.",
      });

      res.status(201).json({ status: `${success}` });
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: `${fail}`, message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(401).json({ status: fail, message: err.message });
    }
  },

  getUserByNumber: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.phonenumber);
      if (!user) {
        return res
          .status(404)
          .json({ status: fail, message: "user not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: fail, message: "Internal server error" });
    }
  },

  updateUserByNumber: async (req, res) => {
    try {
      const phonenumber = req.params.phonenumber;
      const user = await User.findByPk(phonenumber);
      if (!user) {
        return res
          .status(404)
          .json({ status: fail, message: "user not found" });
      }

      await user.update(req.body);

      res.status(200).json({ status: success, data: user });
    } catch (err) {
      res.status(400).json({ status: fail, message: err.message });
    }
  },

  deleteUserByNumber: async (req, res) => {
    try {
      const phonenumber = req.params.phonenumber;
      const user = await User.findByPk(phonenumber);
      if (!user) {
        return res
          .status(404)
          .json({ status: fail, message: "user not found" });
      }

      await user.destroy();

      res.status(200).json({ status: success, data: null });
    } catch (err) {
      res.status(400).json({ status: fail, message: err.message });
    }
  },

  verifyphone: async (req, res) => {
    try {
      const { phonenumber } = req.body;

      const user = await User.findOne({ where: { phonenumber } });

      if (user) {
        res.status(200).json(true);
      } else {
        res.status(401).json(false);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
    }
  },
  login: async (req, res) => {
    try {
      const { phonenumber, password } = req.body;

      // Check if a user with the provided phone number exists in the database
      const user = await User.findOne({ where: { phonenumber } });

      if (user) {
        // Compare the provided password with the stored hashed password
        let passwordMatch; 
        if(user.password === password)  {passwordMatch == true}

        if (passwordMatch) {
          res.status(200).json(true); // Password matched
        } else {
          res.status(200).json(false); // Password didn't match
        }
      } else {
        res.status(401).json(false); // User not found
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err.message); // Internal server error
    }
  },

  resetPasswordByNumber: async (req, res) => {
    try {
      const { phonenumber,password } = req.body;

      // Find the user by phone number
      const user = await User.findOne({ where: { phonenumber } });

      if (!user) {
        return res.status(404).json({ status: fail, message: "User not found" });
      }

      // Update user's password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ status: success, message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: fail, message: error.message });
    }
  },


};
