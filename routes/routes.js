const express = require("express");
const router = express.Router();
// const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
// const { Protect } = require("../utils/Protect");
// const { RestrictTo } = require("../utils/Restrict");

router.post("/verify-phone", userController.verifyphone); //add phone number
router.get("/users", userController.getAllUsers); // get all users
router.post("/signup", userController.createUser); //signup
router.patch("/user/:phonenumber", userController.updateUserByNumber); //update user by phonenumber
router.get("/user/:phonenumber", userController.getUserByNumber); //get user by phonenumber
router.delete("/user/:phonenumber", userController.deleteUserByNumber); //delete user by phonenumber
router.post("/login", userController.login); //login by phonenumber and user's password
// router.post("/forget-password", userController.ForgetPassword);
router.patch("/reset-password", userController.resetPasswordByNumber);

module.exports = router;
