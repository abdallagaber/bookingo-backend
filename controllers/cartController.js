const Cart = require("../models/cartModel");

const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving cart", error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await Cart.create({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(201).json({ cart, message: "Product added to cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else {
      cart.products = cart.products.filter(
        (item) => item.productId.toString() !== productId
      );
    }

    await cart.save();
    res.status(200).json({ cart, message: "Product quantity decreased" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error decreasing quantity", error: error.message });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    existingProduct.quantity += 1;

    await cart.save();
    res.status(200).json({ cart, message: "Product quantity increased" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error increasing quantity", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res.json({ cart, message: "Product removed from cart" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing from cart", error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
};
