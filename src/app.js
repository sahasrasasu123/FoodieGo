const express = require("express");
const cors = require("cors");

const app = express();

const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/foods", foodRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FoodieGo API is running"
    });
});

module.exports = app;