
const express = require("express");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "FoodieGo API is running!"
  });
});

// API routes
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu-items", menuItemRoutes);

module.exports = app;
