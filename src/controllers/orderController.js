
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Food = require("../models/Food");

// Place an order
const createOrder = async (req, res) => {
    try {
        const { items, deliveryAddress } = req.body;

        if (
            !Array.isArray(items) ||
            items.length === 0 ||
            typeof deliveryAddress !== "string" ||
            !deliveryAddress.trim()
        ) {
            return res.status(400).json({
                message: "Food items and delivery address are required"
            });
        }

        if (
            items.some(item =>
                !item ||
                typeof item.food !== "string" ||
                !mongoose.isValidObjectId(item.food) ||
                !Number.isSafeInteger(item.quantity) ||
                item.quantity < 1 ||
                item.quantity > 50
            )
        ) {
            return res.status(400).json({
                message: "Each item needs a valid food ID and quantity from 1 to 50"
            });
        }

        const quantities = new Map();

        for (const item of items) {
            const id = item.food;
            const quantity =
                (quantities.get(id) || 0) + item.quantity;

            if (quantity > 50) {
                return res.status(400).json({
                    message: "Maximum 50 units per food item"
                });
            }

            quantities.set(id, quantity);
        }

        const foodIds = [...quantities.keys()];
        const foods = await Food.find({
            _id: { $in: foodIds }
        });

        if (foods.length !== foodIds.length) {
            return res.status(400).json({
                message: "One or more food items were not found"
            });
        }

        const orderItems = foods.map(food => ({
            food: food._id,
            name: food.name,
            price: food.price,
            quantity: quantities.get(food._id.toString())
        }));

        const totalAmount = orderItems.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        if (!Number.isFinite(totalAmount)) {
            return res.status(400).json({
                message: "Invalid order total"
            });
        }

        const order = await Order.create({
            user: req.userId,
            items: orderItems,
            totalAmount,
            deliveryAddress: deliveryAddress.trim()
        });

        return res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        console.error("Create order error:", error);

        return res.status(500).json({
            message: "Could not place order"
        });
    }
};

// Get the logged-in customer's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.userId
        }).sort({ createdAt: -1 });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get orders error:", error);

        return res.status(500).json({
            message: "Could not retrieve orders"
        });
    }
};

module.exports = { createOrder, getMyOrders };