const express = require("express");
const { auth } = require("../middleware/authMiddleware");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WishlistItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Reference to the product
 *     Wishlist:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Wishlist ID
 *         userId:
 *           type: string
 *           description: User ID who owns the wishlist
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/WishlistItem'
 *       example:
 *         _id: 60d0fe4f5311236168a109cd
 *         userId: 60d0fe4f5311236168a109cb
 *         products:
 *           - productId: 60d0fe4f5311236168a109ca
 */

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get user's wishlist
 *     tags: [Wishlist]
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
 *         description: User's wishlist retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wishlist'
 *       404:
 *         description: Wishlist not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/:userId", auth, getWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
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
 *                 description: ID of the product to add to wishlist
 *             example:
 *               productId: "60d0fe4f5311236168a109ca"
 *     responses:
 *       201:
 *         description: Product added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added to wishlist"
 *       400:
 *         description: Product already in wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product already in wishlist"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post("/:userId", auth, addToWishlist);

/**
 * @swagger
 * /api/wishlist/{userId}/{productId}:
 *   delete:
 *     summary: Remove product from wishlist
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product removed from wishlist"
 *       404:
 *         description: Wishlist not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete("/:userId/:productId", auth, removeFromWishlist);

module.exports = router;
