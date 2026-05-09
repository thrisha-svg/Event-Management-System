const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Order = require("./models/Order");
const Booking = require("./models/Booking");

const orderRoutes =
    require("./routes/orderRoutes");

const bookingRoutes =
    require("./routes/bookingRoutes");
const Event = require("./models/Event");

const app = express();

app.use(cors());

app.use(express.json());


// =======================
// MONGODB CONNECTION
// =======================

mongoose.connect(
    "mongodb://127.0.0.1:27017/eventdb"
)

.then(() => {

    console.log("MongoDB Connected");

})

.catch((err) => {

    console.log(err);

});


// =======================
// ROUTES
// =======================

app.use("/orders", orderRoutes);

app.use("/bookings", bookingRoutes);


// =======================
// REGISTER API
// =======================

app.post("/register", async(req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        const oldUser =
            await User.findOne({ email });

        if (oldUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const newUser = new User({

            name,
            email,
            password: hashedPassword

        });

        await newUser.save();

        res.json({
            message: "Registration Successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =======================
// LOGIN API
// =======================

app.post("/login", async(req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch =
            await bcrypt.compare(
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

// =======================
// ADD EVENT
// =======================

app.post("/events", async(req, res) => {

    try {

        const newEvent = new Event(req.body);

        await newEvent.save();

        res.json({
            message: "Event Added Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});
// =======================
// DELETE EVENT
// =======================

app.delete("/events/:id", async(req, res) => {

    try {

        await Event.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Event Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// =======================
// GET EVENTS
// =======================

app.get("/events", async(req, res) => {

    try {

        const events = await Event.find();

        res.json(events);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});
// =======================
// TEST API
// =======================

app.get("/", (req, res) => {

    res.send("Backend Running");

});


// =======================
// USERS API
// =======================

app.get("/users", async(req, res) => {

    try {

        const users =
            await User.find();

        res.json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =======================
// EVENTS API
// =======================

app.get("/events", (req, res) => {

    const events = [

        { name: "Wedding" },

        { name: "Birthday" },

        { name: "Corporate Event" }

    ];

    res.json(events);

});


// =======================
// SERVER
// =======================

app.listen(5000, () => {

    console.log(
        "Server Running On Port 5000"
    );

});