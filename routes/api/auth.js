const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
  res.send("Auth route");
});

router.post(
  "/",

  [
    check("email", "Enter Valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],

  async (req, res, next) => {
    const err = validationResult(req);
    // console.log("eee",);
    if (!err.isEmpty()) {

      return res.status(400).json({ errors: err.array() });
      //   next();
    }
    // console.log(req.body);
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        // console.log("III");
        return res.status(400).json({ error: [{ msg: "User not found" }] });
      }

      const isMismatch = await bcrypt.compare(password, user.password);
      if (!isMismatch) {
        // console.log("IUBI")
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //   return res.send("Users route");
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server error");
    }
  }
);
module.exports = router;
