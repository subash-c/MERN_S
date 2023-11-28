const auth = require("../../../middleware/auth");
const User = require("../../../models/User");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const express=require("express")
const router=express.Router()

router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        return res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
    }
});



router.post(
    "/",

    [
        check("email", "Enter Valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],

    async (req, res, next) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {

            return res.status(400).json({ errors: err.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: [{ msg: "User not found" }] });
            }

            const isMismatch = await bcrypt.compare(password, user.password);
            if (!isMismatch) {
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

        } catch (error) {
            console.log(error.message);
            return res.status(500).send("Server error");
        }
    }
);

module.exports = router;
