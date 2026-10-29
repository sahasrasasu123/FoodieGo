
const mongoose = require("mongoose");
const Food = require("../models/Food");

// GET: Fetch all foods
const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 });

        return res.status(200).json(foods);
    } catch (error) {
        console.error("Get foods error:", error);

        return res.status(500).json({
            message: "Failed to fetch foods"
        });
    }
};

// GET: Fetch one food by ID
const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid food ID"
            });
        }

        const food = await Food.findById(id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        return res.status(200).json(food);
    } catch (error) {
        console.error("Get food error:", error);

        return res.status(500).json({
            message: "Failed to fetch food"
        });
    }
};

// POST: Add new food
const createFood = async (req, res) => {
    try {
        const { name, price, category, description, image } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            price < 0 ||
            typeof category !== "string" ||
            !category.trim()
        ) {
            return res.status(400).json({
                message: "Name, non-negative numeric price and category are required"
            });
        }

        const food = await Food.create({
            name: name.trim(),
            price,
            category: category.trim(),
            description,
            image
        });

        return res.status(201).json({
            message: "Food added successfully",
            food
        });
    } catch (error) {
        console.error("Create food error:", error);

        return res.status(400).json({
            message: error.message
        });
    }
};

// PUT: Update food
const updateFood = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid food ID"
            });
        }

        const food = await Food.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        return res.status(200).json({
            message: "Food updated successfully",
            food
        });
    } catch (error) {
        console.error("Update food error:", error);

        return res.status(400).json({
            message: error.message
        });
    }
};

// DELETE: Remove food
const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid food ID"
            });
        }

        const food = await Food.findByIdAndDelete(id);

        if (!food) {
            return res.status(404).json({
                message: "Food not found"
            });
        }

        return res.status(200).json({
            message: "Food deleted successfully",
            food
        });
    } catch (error) {
        console.error("Delete food error:", error);

        return res.status(500).json({
            message: "Failed to delete food"
        });
    }
};

module.exports = {
    getAllFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood
};