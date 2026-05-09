const mongoose = require("mongoose");

const OrderSchema =
    new mongoose.Schema({

        name: String,

        phone: String,

        address: String,

        total: Number,

        paymentMethod: String,

        status: {
            type: String,
            default: "Pending"
        },

        date: {
            type: String,
            default: new Date().toLocaleDateString()
        },

        eventName: String,

        location: String

    });

module.exports =
    mongoose.model("Order", OrderSchema);