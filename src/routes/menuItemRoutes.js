const express = require("express");

const {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItemController");

const router = express.Router();

router.post("/", createMenuItem);
router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);
router.patch("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);
module.exports = router;