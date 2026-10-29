

const express = require("express");
const jwt = require("jsonwebtoken");

const {
    createOrder,
    getMyOrders
} = require("../controllers/orderController");

const router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Please log in first"
        });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({
            message: "Authentication is not configured"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (!decoded.userId) {
            return res.status(403).json({
                message: "Invalid token"
            });
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        });
    }
}

router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, getMyOrders);

module.exports = router;