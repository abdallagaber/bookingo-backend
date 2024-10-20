const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} = require("../controllers/cartController");

const router = express.Router();

// Get cart for a specific user
router.get("/:userId", auth, getCart);

// Add a product to the cart
router.post("/:userId/add", auth, addToCart);

// Increase product quantity
router.patch("/:userId/increase", auth, increaseQuantity);

// Decrease product quantity
router.patch("/:userId/decrease", auth, decreaseQuantity);

// Remove product from the cart
router.delete("/:userId/:productId", auth, removeFromCart);

module.exports = router;
