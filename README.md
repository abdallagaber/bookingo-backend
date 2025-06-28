# 📚 Bookingo API

> A comprehensive and modern bookstore REST API built with Node.js, Express, and MongoDB

[![Live Demo](https://img.shields.io/badge/Live_Demo-🚀_Visit_API-blue?style=for-the-badge)](https://bookingo-backend-cfcp.onrender.com)
[![API Docs](https://img.shields.io/badge/API_Docs-📖_Swagger-green?style=for-the-badge)](https://bookingo-backend-cfcp.onrender.com/api-docs)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)](https://mongodb.com)

## 🌟 Features

- 📖 **120+ Pre-loaded Books** across multiple genres
- 🔐 **JWT Authentication** with role-based access (Customer/Admin)
- 🛒 **Shopping Cart Management** with quantity controls
- ❤️ **Wishlist Functionality** for saving favorite books
- 👑 **Admin Panel** for complete book management
- 📚 **Rich Book Data** with covers, ratings, genres, and descriptions
- 🔍 **Comprehensive API Documentation** with Swagger UI
- 🚀 **Production Ready** with environment-based configuration
- 🛡️ **Security Best Practices** with bcrypt and JWT
- ✅ **Input Validation** and error handling

## 🚀 Live Demo

- **API Base URL:** [https://bookingo-backend-cfcp.onrender.com](https://bookingo-backend-cfcp.onrender.com)
- **Interactive Documentation:** [https://bookingo-backend-cfcp.onrender.com/api-docs](https://bookingo-backend-cfcp.onrender.com/api-docs)

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Documentation:** Swagger UI with OpenAPI 3.0
- **Environment:** dotenv for configuration
- **Deployment:** Render

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/bookingo-backend.git
cd bookingo-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/bookingo-db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Production URL (for Swagger documentation)
PRODUCTION_URL=https://your-domain.com

# CORS Configuration (optional)
CLIENT_URL=http://localhost:3000
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📖 API Documentation

Visit the interactive Swagger documentation at:

- **Local:** [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **Live:** [https://bookingo-backend-cfcp.onrender.com/api-docs](https://bookingo-backend-cfcp.onrender.com/api-docs)

### Welcome Endpoint

```http
GET /
```

Returns API information, available endpoints, and feature list.

## 🔗 API Endpoints Overview

### 🔐 Authentication

| Method | Endpoint              | Description       | Auth Required |
| ------ | --------------------- | ----------------- | ------------- |
| POST   | `/api/users/register` | Register new user | ❌            |
| POST   | `/api/users/login`    | User login        | ❌            |

### 📚 Products

| Method | Endpoint            | Description     | Auth Required |
| ------ | ------------------- | --------------- | ------------- |
| GET    | `/api/products`     | Get all books   | ❌            |
| GET    | `/api/products/:id` | Get book by ID  | ❌            |
| POST   | `/api/products`     | Create new book | ✅ (Admin)    |
| PUT    | `/api/products/:id` | Update book     | ✅ (Admin)    |
| DELETE | `/api/products/:id` | Delete book     | ✅ (Admin)    |

### 🛒 Shopping Cart

| Method | Endpoint                       | Description       | Auth Required |
| ------ | ------------------------------ | ----------------- | ------------- |
| GET    | `/api/cart/:userId`            | Get user's cart   | ✅            |
| POST   | `/api/cart/:userId/add`        | Add item to cart  | ✅            |
| PATCH  | `/api/cart/:userId/increase`   | Increase quantity | ✅            |
| PATCH  | `/api/cart/:userId/decrease`   | Decrease quantity | ✅            |
| DELETE | `/api/cart/:userId/:productId` | Remove from cart  | ✅            |

### ❤️ Wishlist

| Method | Endpoint                           | Description          | Auth Required |
| ------ | ---------------------------------- | -------------------- | ------------- |
| GET    | `/api/wishlist/:userId`            | Get user's wishlist  | ✅            |
| POST   | `/api/wishlist/:userId`            | Add to wishlist      | ✅            |
| DELETE | `/api/wishlist/:userId/:productId` | Remove from wishlist | ✅            |

## 🏗️ Data Models

### Book Schema

```javascript
{
  title: String,        // Book title
  author: String,       // Author name
  description: String,  // Book description
  coverImage: String,   // Cover image URL
  price: Number,        // Price in USD
  rating: Number,       // Average rating (0-5)
  genre: String,        // Book genre
  stock: Number,        // Available quantity
  reviews: [Review]     // User reviews
}
```

### User Schema

```javascript
{
  name: String,         // Full name
  email: String,        // Email (unique)
  password: String,     // Hashed password
  role: String          // 'customer' or 'admin'
}
```

## 🔑 Authentication

Most endpoints require a valid JWT token. Include it in the Authorization header:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_JWT_TOKEN'
}
```

### Getting a Token

1. Register: `POST /api/users/register`
2. Login: `POST /api/users/login`
3. Use the returned token in subsequent requests

## 📊 Sample Data

The API comes pre-loaded with **120+ books** across various genres:

- Classic Literature (The Great Gatsby, 1984, etc.)
- Fantasy (Harry Potter, Lord of the Rings, etc.)
- Science Fiction (Dune, Project Hail Mary, etc.)
- Young Adult (The Hunger Games, The Fault in Our Stars, etc.)
- Mystery/Thriller (Gone Girl, The Girl with the Dragon Tattoo, etc.)
- Non-Fiction (Atomic Habits, Sapiens, etc.)

## 🚀 Deployment

### Render Deployment

1. Fork this repository
2. Connect to Render
3. Set environment variables:
   ```
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret
   PRODUCTION_URL=https://your-app-name.onrender.com
   ```

### Other Platforms

- **Heroku:** Works with minimal configuration
- **Vercel:** Requires serverless function setup
- **Railway:** Direct deployment from GitHub

## 🧪 Testing the API

### Using Swagger UI

1. Visit the documentation page
2. Click "Try it out" on any endpoint
3. Fill in required parameters
4. Execute and see real responses

### Using curl

```bash
# Get all books
curl https://bookingo-backend-cfcp.onrender.com/api/products

# Register a new user
curl -X POST https://bookingo-backend-cfcp.onrender.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Using Postman

Import the API documentation directly from:
`https://bookingo-backend-cfcp.onrender.com/api-docs`

## 🛡️ Security Features

- **Password Hashing:** bcrypt with salt rounds
- **JWT Authentication:** Secure token-based auth
- **Input Validation:** Mongoose schema validation
- **CORS Configuration:** Configurable cross-origin requests
- **Environment Variables:** Sensitive data protection

## 🙏 Acknowledgments

- Built with ❤️ using Node.js and Express
- Book data curated from various public sources
- Swagger documentation for easy API exploration
- MongoDB for robust data storage

---

<div align="center">
  <p>Made with ❤️ by the Bookingo Team</p>
  <p>
    <a href="https://bookingo-backend-cfcp.onrender.com">🚀 Live Demo</a> •
    <a href="https://bookingo-backend-cfcp.onrender.com/api-docs">📖 API Docs</a> •
    <a href="#-contributing">🤝 Contribute</a>
  </p>
</div>
