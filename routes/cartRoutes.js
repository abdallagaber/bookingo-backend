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

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Reference to the product
 *         quantity:
 *           type: number
 *           minimum: 1
 *           description: Quantity of the product in cart
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Cart ID
 *         userId:
 *           type: string
 *           description: User ID who owns the cart
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *       example:
 *         _id: 60d0fe4f5311236168a109cc
 *         userId: 60d0fe4f5311236168a109cb
 *         products:
 *           - productId: 60d0fe4f5311236168a109ca
 *             quantity: 2
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:userId", auth, getCart);

/**
 * @swagger
 * /api/cart/{userId}/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to add
 *               quantity:
 *                 type: number
 *                 minimum: 1
 *                 default: 1
 *                 description: Quantity to add
 *             example:
 *               productId: "60d0fe4f5311236168a109ca"
 *               quantity: 1
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:userId/add", auth, addToCart);

/**
 * @swagger
 * /api/cart/{userId}/increase:
 *   patch:
 *     summary: Increase product quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product
 *             example:
 *               productId: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Product quantity increased successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart or product not found
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch("/:userId/increase", auth, increaseQuantity);

/**
 * @swagger
 * /api/cart/{userId}/decrease:
 *   patch:
 *     summary: Decrease product quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product
 *             example:
 *               productId: "60d0fe4f5311236168a109ca"
 *     responses:
 *       200:
 *         description: Product quantity decreased successfully (removes item if quantity becomes 0)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart or product not found
 *       400:
 *         description: Product ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.patch("/:userId/decrease", auth, decreaseQuantity);

/**
 * @swagger
 * /api/cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID to remove
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cart:
 *                   $ref: '#/components/schemas/Cart'
 *                 message:
 *                   type: string
 *       404:
 *         description: Cart not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/:userId/:productId", auth, removeFromCart);

module.exports = router;
