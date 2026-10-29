
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");


const Food = require("./models/Food");




const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);

app.use("/api/orders", orderRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to FoodieGo API");
});

// Food Routes
app.use("/api/foods", foodRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`FoodieGo Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
});