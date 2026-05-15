const express = require("express");

const router = express.Router();

const Order = require("../models/Order");


// ==========================
// GET ALL ORDERS
// ==========================

router.get("/", async(req, res) => {

    try {

        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (error) {

        console.log("GET ORDERS ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });

    }

});


// ==========================
// CREATE ORDER
// ==========================

router.post("/", async(req, res) => {

    try {

        console.log("Request Body:", req.body);

        const newOrder = new Order(req.body);

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Booking Successful",
            data: savedOrder
        });

    } catch (error) {

        console.log("CREATE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Booking Failed",
            error: error.message
        });

    }

});


// ==========================
// UPDATE ORDER
// ==========================

router.put("/:id", async(req, res) => {

    try {

        const updatedOrder = await Order.findByIdAndUpdate(

            req.params.id,

            {
                $set: req.body
            },

            {
                new: true,
                runValidators: true
            }

        );

        if (!updatedOrder) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
            data: updatedOrder
        });

    } catch (error) {

        console.log("UPDATE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message
        });

    }

});


// ==========================
// DELETE ORDER
// ==========================

router.delete("/:id", async(req, res) => {

    try {

        const deletedOrder = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!deletedOrder) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully"
        });

    } catch (error) {

        console.log("DELETE ORDER ERROR:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete order",
            error: error.message
        });

    }

});

module.exports = router;