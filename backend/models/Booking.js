const mongoose = require("mongoose");

const BookingSchema =
    new mongoose.Schema({

        user: String,

        eventName: String,

        date: String,

        location: String,

        price: Number,

        image: String,

        status: {
            type: String,
            default: "Booked"
        }

    });

module.exports =
    mongoose.model("Booking", BookingSchema);