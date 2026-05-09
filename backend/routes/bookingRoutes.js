const express = require("express");

const router = express.Router();

const Booking =
    require("../models/Booking");


// =======================
// CREATE BOOKING
// =======================

router.post("/",
    async(req, res) => {

        try {

            const booking =
                new Booking(req.body);

            await booking.save();

            res.json({

                message: "Booking Successful"

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Server Error"

            });
        }
    });


// =======================
// GET BOOKINGS
// =======================

router.get("/",
    async(req, res) => {

        try {

            const bookings =
                await Booking.find();

            res.json(bookings);

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Server Error"

            });
        }
    });


// =======================
// DELETE BOOKING
// =======================

router.delete("/:id",
    async(req, res) => {

        try {

            await Booking.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message: "Booking Deleted"

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                message: "Server Error"

            });
        }
    });

module.exports = router;