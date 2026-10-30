const express = require("express");
const cors = require("cors");

const app = express();


const restaurantRoutes = require("./routes/restaurantRoutes");

app.use(cors());
app.use(express.json());


app.use("/api/restaurants", restaurantRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FoodieGo API is running"
    });
});

module.exports = app;