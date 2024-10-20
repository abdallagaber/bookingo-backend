const express = require("express");
const { auth, adminAuth } = require("../middleware/authMiddleware");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// Public route to get all products
router.get("/", getProducts);

// Public route to get a product by ID
router.get("/:id", getProductById);

// Admin route to create a new product
router.post("/", auth, adminAuth, createProduct);

// Admin route to update a product
router.put("/:id", auth, adminAuth, updateProduct);

// Admin route to delete a product
router.delete("/:id", auth, adminAuth, deleteProduct);

module.exports = router;
