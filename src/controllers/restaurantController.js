
const mongoose = require("mongoose");
const Restaurant = require("../models/Restaurant");

// CREATE a restaurant
const createRestaurant = async (req, res) => {
    try {
        const { name, description, cuisineTypes, address, phone, isActive } = req.body;
        if (
    cuisineTypes !== undefined &&
    (!Array.isArray(cuisineTypes) ||
        !cuisineTypes.every(item => typeof item === "string"))
) {
    return res.status(400).json({
        success: false,
        message: "cuisineTypes must be an array of strings"
    });
}

if (isActive !== undefined && typeof isActive !== "boolean") {
    return res.status(400).json({
        success: false,
        message: "isActive must be a boolean"
    });
}

        if (!name || !name.trim() || !address || !address.trim()) {
            return res.status(400).json({
                success: false,
                message: "Restaurant name and address are required"
            });
        }

        const restaurant = await Restaurant.create({
            name,
            description,
            cuisineTypes,
            address,
            phone,
            isActive
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant created successfully",
            data: restaurant
        });
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant data",
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// GET all restaurants
const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();

        return res.status(200).json({
            success: true,
            count: restaurants.length,
            data: restaurants
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// GET one restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID"
            });
        }

        const restaurant = await Restaurant.findById(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// UPDATE a restaurant
const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const allowedFields = [
            "name",
            "description",
            "cuisineTypes",
            "address",
            "phone",
            "isActive"
        ];

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID"
            });
        }

        const updates = {};
        for (const field of allowedFields) {
            if (Object.prototype.hasOwnProperty.call(req.body, field)) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one valid field to update"
            });
        }

        if (
            Object.prototype.hasOwnProperty.call(updates, "name") &&
            (typeof updates.name !== "string" || !updates.name.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Restaurant name must be a non-empty string"
            });
        }

        if (
            Object.prototype.hasOwnProperty.call(updates, "address") &&
            (typeof updates.address !== "string" || !updates.address.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Restaurant address must be a non-empty string"
            });
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant updated successfully",
            data: restaurant
        });
    } catch (error) {
        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant data",
                error: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// DELETE a restaurant
const deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid restaurant ID"
            });
        }

        const restaurant = await Restaurant.findByIdAndDelete(id);

        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Restaurant deleted successfully",
            data: restaurant
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
};
