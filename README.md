# Bookstore API

This is a Node.js and Express-based backend for a bookstore application. The API allows users to manage products, cart, and wishlist functionalities, as well as handle user authentication and authorization.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Product Endpoints](#product-endpoints)
  - [Cart Endpoints](#cart-endpoints)
  - [Wishlist Endpoints](#wishlist-endpoints)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bookstore-api.git
   cd bookstore-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:

   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:5000` (or the specified port).

## Usage

You can use tools like Postman to interact with the API.

## Authentication

Most of the endpoints require a valid JWT token for authentication. The token should be sent in the `Authorization` header as follows:

```plaintext
Authorization: Bearer <jwt_token>
```

## API Endpoints

### User Endpoints

- **Register a new user**

  - **POST** `/api/users/register`
  - **Request body**:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully",
      "user": {
        "_id": "userId",
        "name": "User Name",
        "email": "user@example.com",
        "role": "customer"
      }
    }
    ```

- **Login**
  - **POST** `/api/users/login`
  - **Request body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User logged in successfully",
      "token": "jwt_token",
      "user": {
        "_id": "userId",
        "name": "User Name",
        "email": "user@example.com",
        "role": "customer"
      }
    }
    ```

### Product Endpoints

- **Get all products**

  - **GET** `/api/products`

- **Get a specific product**

  - **GET** `/api/products/:productId`

- **Add a new product** (Admin only)

  - **POST** `/api/products`
  - **Headers**: `Authorization: Bearer <jwt_token>`
  - **Request body**:
    ```json
    {
      "title": "Book Title",
      "author": "Author Name",
      "description": "Book Description",
      "coverImage": "URL to cover image",
      "price": 19.99,
      "rating": 4.5,
      "genre": "Fiction",
      "stock": 10,
      "reviews": []
    }
    ```

- **Update a product** (Admin only)

  - **PUT** `/api/products/:productId`
  - **Headers**: `Authorization: Bearer <jwt_token>`
  - **Request body**: Same as POST request

- **Delete a product** (Admin only)
  - **DELETE** `/api/products/:productId`
  - **Headers**: `Authorization: Bearer <jwt_token>`

### Cart Endpoints

- **Get user's cart**

  - **GET** `/api/cart/:userId`
  - **Headers**: `Authorization: Bearer <jwt_token>`

- **Add a product to the cart**

  - **POST** `/api/cart/:userId`
  - **Request body**:
    ```json
    {
      "productId": "productId",
      "quantity": 1
    }
    ```
  - **Headers**: `Authorization: Bearer <jwt_token>`

- **Remove a product from the cart**

  - **DELETE** `/api/cart/:userId/:productId`
  - **Headers**: `Authorization: Bearer <jwt_token>`

- **Increase or decrease product quantity in the cart**
  - **PUT** `/api/cart/:userId`
  - **Headers**: `Authorization: Bearer <jwt_token>`
  - **Request body**:
    ```json
    {
      "productId": "productId",
      "quantity": 2
    }
    ```

### Wishlist Endpoints

- **Get user's wishlist**

  - **GET** `/api/wishlist/:userId`
  - **Headers**: `Authorization: Bearer <jwt_token>`

- **Add a product to the wishlist**

  - **POST** `/api/wishlist/:userId`
  - **Headers**: `Authorization: Bearer <jwt_token>`
  - **Request body**:
    ```json
    {
      "productId": "productId"
    }
    ```

- **Remove a product from the wishlist**
  - **DELETE** `/api/wishlist/:userId/:productId`
  - **Headers**: `Authorization: Bearer <jwt_token>`

## Error Handling

The API uses standard HTTP status codes to indicate errors. In the event of an error, the response will include an error message in JSON format:

Example response:

```json
{
  "message": "Error message",
  "error": "Detailed error description"
}
```
