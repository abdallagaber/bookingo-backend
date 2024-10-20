const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// Route to get the user's wishlist
router.get("/:userId", auth, getWishlist);

// Route to add a product to the user's wishlist
router.post("/:userId", auth, addToWishlist);

// Route to remove a product from the user's wishlist
router.delete("/:userId/:productId", auth, removeFromWishlist);

module.exports = router;
