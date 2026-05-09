const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    date: String,

    location: String,

    price: String,

    image: String,

    desc: String

});

module.exports = mongoose.model(
    "Event",
    eventSchema
);