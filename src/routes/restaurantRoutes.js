
const express = require("express");
const router = express.Router();

const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require("../controllers/restaurantController");

router.post("/", createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);
router.patch("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;
