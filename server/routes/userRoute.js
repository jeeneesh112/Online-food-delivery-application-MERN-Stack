const express = require("express");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/userModel");

router.post(
  "/register",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { name, email, password } = req.body;
    try {
      let userDetails = await User.findOne({
        email,
      });
      if (userDetails) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }
      userDetails = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      userDetails.password = await bcrypt.hash(password, salt);
      await userDetails.save();
      res.status(200).json({
        success: true,
        message: "Register success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error,
      });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Please Enter a Valid Email").isEmail(),
    check("password", "Please Enter a Valid Password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email,
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      const currentUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      res.status(200).send(currentUser);
    } catch (e) {
      res.status(500).json({
        message: "Something Went Wrong",
      });
    }
  }
);

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/asignadmin", async (req, res) => {
  const userid = req.body.userid;
  try {
    const user = await User.findOne({ _id: userid });
    user.isAdmin = true;
    await user.save();
    res.status(200).send("Admin role assigned.");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});

module.exports = router;
