const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

dotenv.config();
connectDB();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bookingo API",
      version: "1.0.0",
      description:
        "A comprehensive bookstore API for managing books, users, carts, and wishlists",
      contact: {
        name: "Bookingo Team",
        email: "support@bookingo.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./models/*.js"], // paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome to Bookingo API
 *     tags: [General]
 *     description: Get API information and available endpoints
 *     responses:
 *       200:
 *         description: API welcome message and information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "🚀 Welcome to Bookingo API!"
 *                 description:
 *                   type: string
 *                   example: "A comprehensive bookstore API for managing books, users, carts, and wishlists"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 documentation:
 *                   type: string
 *                   example: "http://localhost:5000/api-docs"
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: string
 *                       example: "/api/products"
 *                     authentication:
 *                       type: string
 *                       example: "/api/users"
 *                     cart:
 *                       type: string
 *                       example: "/api/cart"
 *                     wishlist:
 *                       type: string
 *                       example: "/api/wishlist"
 *                 totalBooks:
 *                   type: string
 *                   example: "120+ books available"
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["📚 Browse extensive book catalog", "🔐 User authentication & authorization"]
 */
// Home route
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Welcome to Bookingo API!",
    description:
      "A comprehensive bookstore API for managing books, users, carts, and wishlists",
    version: "1.0.0",
    documentation: `${req.protocol}://${req.get("host")}/api-docs`,
    endpoints: {
      products: "/api/products",
      authentication: "/api/users",
      cart: "/api/cart",
      wishlist: "/api/wishlist",
    },
    totalBooks: "120+ books available",
    features: [
      "📚 Browse extensive book catalog",
      "🔐 User authentication & authorization",
      "🛒 Shopping cart management",
      "❤️ Wishlist functionality",
      "👑 Admin product management",
      "📖 Interactive API documentation",
    ],
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
