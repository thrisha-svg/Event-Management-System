const express = require("express");

const router = express.Router();

const Order = require("../models/Order");


// =========================
// ADD ORDER
// =========================

router.post("/", async(req, res) => {

    try {

        const newOrder = new Order(req.body);

        await newOrder.save();

        res.json({
            message: "Order Added"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =========================
// GET ORDERS
// =========================

router.get("/", async(req, res) => {

    try {

        const orders = await Order.find();

        res.json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =========================
// UPDATE ORDER
// =========================

router.put("/:id", async(req, res) => {

    try {

        await Order.findByIdAndUpdate(

            req.params.id,

            req.body

        );

        res.json({
            message: "Order Updated"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});


// =========================
// DELETE ORDER
// =========================

router.delete("/:id", async(req, res) => {

    try {

        await Order.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Order Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

});

module.exports = router;