const router = require("express").Router();
const User = require("../models/User");

// Verify Token import
const verify = require("../verifyToken");
// Import CryptoJS to hash passwords into database
const CryptoJS = require("crypto-js");

// UPDATE USER INFO
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      // If User Wants to Update/Change Password
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }

    try {
      // This will Update the User Information First
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        // And this will display the New User Information in Postman JSON
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only YOUR account");
  }
});

// DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      // This will Update the User Information First
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only YOUR account");
  }
});

// GET USER
router.get("/find/:id", async (req, res) => {
  try {
    // This will Update the User Information First
    const user = await User.findById(req.params.id);
    // Remove the password from the JSON object when sent through Postman
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USERS
router.get("/", verify, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ __id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You do not have permissions to see all users!");
  }
});

// GET USER STATISTICS
router.get("/stats", async (req, res) => {
  // Today
  const today = new Date();
  // Last Year
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  // today.setFullYear sets today as a year and then (today.setFullYear() - 1) gives us last year

  // const monthsArr = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          // Looks at createdAt Date, and if it is January, it'll return month: 1
          // MongoDB $month returns months, if selected $year, it'll return the amount of users by Years
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          //   Group our Documents if we are aggregating, id: will be month, 1, 2, 3, etc
          _id: "$month",
          //   Total Return Total Users Per Month
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
