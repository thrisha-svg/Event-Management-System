const express = require("express");
const router = express.Router();

const User = require("../models/User");

// REGISTER
router.post("/register", async(req, res) => {
    console.log("BODY RECEIVED:", req.body);
    try {


        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.json({ message: "User registered successfully", user: newuser });
    } catch (err) {
        res.status(500).json(err);
    }
});
app.post("/login", async(req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // compare bcrypt password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        res.json({
            message: "Login Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;