const express = require("express");

const router = express.Router();

const User =
  require("../models/User");


// ==========================
// GET ALL USERS
// ==========================

router.get("/", async (req, res) => {

  try {

    const users =
      await User.find();

    res.status(200).json(users);

  }

  catch (error) {

    console.log(
      "GET USERS ERROR:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch users",

      error: error.message

    });

  }

});

module.exports = router;