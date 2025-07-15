## 📚 Document database

![ER Diagram of Database](/docs/db/er-diagram.png)

- **`er-diagram online`**: [view at dbdiagram.io](https://dbdiagram.io/e/687278edf413ba35088d9bd1/68727e13f413ba35088df225)

# Register & Login in CRUD NestJS Project

By default, all endpoints are prefixed with:  
> `http://localhost:3000/api`

This document provides instructions for using the register and login APIs in the NestJS project.

## 1. Register Account

- **Endpoint:** `POST /auth/register`
- **Request Body (JSON):**
  ```json
  {
    "name": "your name",
    "email": "your email",
    "password": "your password",
    "confirmPassword": "your confirm password"
  }
  ```
- **Successful Response:**
  ```json
  {
    "data": {},
    "statusCode": 201
  }
  ```
- **Notes:**
  - Use a strong password.

## 2. Login

- **Endpoint:** `POST /auth/login`
- **Request Body (JSON):**
  ```json
  {
    "email": "your email",
    "password": "your password"
  }
  ```
- **Successful Response:**
  ```json
  {
    "data": {
      "accessToken": "access_token",
      "refreshToken": "refresh_token"
    },
    "statusCode": 200
  }
  ```
- **Notes:**
  - After successful login, use the returned `access_token` to authenticate requests to protected APIs (add header: `Authorization: Bearer <access_token>`).

## 3. Refresh Token

- **Endpoint:** `POST /auth/refresh-token`
- **Request Body (JSON):**
  ```json
  {
    "refreshToken": "your refresh token"
  }
  ```
- **Successful Response:**
  ```json
  {
    "accessToken": "new-jwt-token",
    "refreshToken": "new-jwt-token"
  }
  ```
- **Usage:**  
  When your `access_token` expires, use the `refresh_token` to get a new `access_token` without logging in again.

---

## 4. Post APIs
### a. Create Post

- **Endpoint:** `POST /posts`
- **Headers:**
  - `Authorization: Bearer <access_token>`
- **Request Body (JSON):**
  ```json
  {
    "title": "Post title",
    "content": "Post content"
  }
  ```
- **Successful Response:**
  ```json
  {
    "id": 1,
    "title": "Post title",
    "content": "Post content",
    "authorId": 1,
    "createdAt": "2025-07-15T04:38:58Z"
  }
  ```

### b. Get Posts by me

- **Endpoint:** `GET /posts`
- **Headers:** (optional, if needed for authentication)
  - `Authorization: Bearer <access_token>`
- **Successful Response:**
  ```json
  {
    "data": [
      {
        "id": 1,
        "title": "title",
        "content": "test@gmai.com",
        "authorId": 1,
        "createAt": "2025-07-14T16:12:27.190Z",
        "updateAt": "2025-07-14T16:12:27.190Z",
        "author": {
          "id": 1,
          "email": "test@gmai.com",
          "name": "test",
          "createAt": "2025-07-13T15:22:27.501Z",
          "updateAt": "2025-07-13T15:22:27.501Z"
        }
      }
    ],
    "statusCode": 200
  }
  ```

### c. Get Post by ID

- **Endpoint:** `GET /posts/:id`
- **Headers:** (optional, if needed for authentication)
  - `Authorization: Bearer <access_token>`
- **Response:**
  ```json
  {
    "data": {
      "id": 1,
      "title": "title",
      "content": "test@gmai.com",
      "authorId": 1,
      "createAt": "2025-07-14T16:12:27.190Z",
      "updateAt": "2025-07-14T16:12:27.190Z",
      "author": {
        "id": 1,
        "email": "test@gmai.com",
        "name": "test",
        "createAt": "2025-07-13T15:22:27.501Z",
        "updateAt": "2025-07-13T15:22:27.501Z"
      }
    },
    "statusCode": 200
  }
  ```

### d. Update Post by me

- **Endpoint:** `PUT /posts/:id`
- **Headers:**
  - `Authorization: Bearer <access_token>`
- **Request Body (JSON):**
  ```json
  {
    "title": "New title",
    "content": "New content"
  }
  ```
- **Successful Response:**
  ```json
  {
    "data": {
      "id": 1,
      "title": "title",
      "content": "test@gmai.com",
      "authorId": 1,
      "createAt": "2025-07-14T16:12:27.190Z",
      "updateAt": "2025-07-14T16:12:27.190Z",
      "author": {
        "id": 1,
        "email": "test@gmai.com",
        "name": "test",
        "createAt": "2025-07-13T15:22:27.501Z",
        "updateAt": "2025-07-13T15:22:27.501Z"
      }
    },
    "statusCode": 200
  }
  ```

### e. Delete Post by me

- **Endpoint:** `DELETE /posts/:id`
- **Headers:**
  - `Authorization: Bearer <access_token>`
- **Successful Response:**
  ```json
  {
    "data": true,
    "statusCode": 200
  }
  ```

---
