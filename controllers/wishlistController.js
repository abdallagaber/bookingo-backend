const Wishlist = require("../models/wishlistModel");

const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId }).populate(
      "products.productId"
    );
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json(wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId, products: [] });
    }

    const existingProduct = wishlist.products.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    wishlist.products.push({ productId });
    await wishlist.save();

    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to wishlist", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await wishlist.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing from wishlist", error: error.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
