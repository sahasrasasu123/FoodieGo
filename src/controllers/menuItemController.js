
const MenuItem = require("../models/MenuItem");
const Restaurant = require("../models/Restaurant");

 
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, restaurant } = req.body;

    const existingRestaurant = await Restaurant.findById(restaurant);

    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      imageUrl,
      restaurant,
    });

    res.status(201).json({
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllMenuItems = async (req, res) => {
  try {
    const filter = {};

    if (req.query.restaurantId) {
      filter.restaurant = req.query.restaurantId;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.isAvailable !== undefined) {
      if (!["true", "false"].includes(req.query.isAvailable)) {
        return res.status(400).json({
          message: "isAvailable must be true or false",
        });
      }

      filter.isAvailable = req.query.isAvailable === "true";
    }

    let sortOption = {};

    if (req.query.sort === "price_asc") {
      sortOption.price = 1;
    } else if (req.query.sort === "price_desc") {
      sortOption.price = -1;
    }

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(req.query.limit) || 10, 1),
      50
    );

    const skip = (page - 1) * limit;

    const menuItems = await MenuItem.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .populate("restaurant", "name address");

    const totalItems = await MenuItem.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalItems,
      count: menuItems.length,
      menuItems,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id)
      .populate("restaurant", "name address");

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json({ menuItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateMenuItem = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "description",
      "price",
      "category",
      "imageUrl",
      "isAvailable",
      "restaurant",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.restaurant) {
      const existingRestaurant = await Restaurant.findById(
        updates.restaurant
      );

      if (!existingRestaurant) {
        return res.status(404).json({
          message: "Restaurant not found",
        });
      }
    }

    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate("restaurant", "name address");

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      message: "Menu item updated successfully",
      menuItem,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
