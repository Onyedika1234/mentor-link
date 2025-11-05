# Mentor-Link API

## Overview
This is a RESTful API for a mentor-student linking platform, built with Node.js and Express. It uses Prisma as the ORM to interact with a MySQL database and Redis for performance caching.

## Features
- **Express.js**: Serves as the web application framework for building the RESTful API and managing routes.
- **Prisma**: Provides a next-generation ORM for database access and management, ensuring type-safe database queries.
- **Redis**: Implements caching for frequently requested data (like mentor lists and profiles) to reduce database load and improve response times.
- **JSON Web Tokens (JWT)**: Secures API endpoints through a token-based authentication system.
- **bcryptjs**: Ensures user security by hashing passwords before storing them in the database.
- **express-rate-limit**: Protects the API from brute-force attacks and abuse by limiting request rates.

## Getting Started
### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/Onyedika1234/mentor-link.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd mentor-link
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root of the project and add the environment variables listed below.
5.  Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
6.  Synchronize the database schema with your database:
    ```bash
    npx prisma db push
    ```
7.  Start the development server:
    ```bash
    npm run dev
    ```

### Environment Variables
Create a `.env` file in the root directory and populate it with the following variables.

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

# Server
PORT=3000

# JWT Authentication
JWT_SECRET="your_super_secret_jwt_key"
JWT_EXPIRES_IN="1d"

# Redis (optional, defaults to localhost if not set)
# REDIS_URL="redis://localhost:6379"
```

## API Documentation
### Base URL
All API endpoints are prefixed from the server's root URL.
Example: `http://localhost:3000`

---

### Endpoints
#### **Authentication (`/auth`)**

#### `POST /auth/register`
Registers a new user account.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "STUDENT",
    "mentorId": null,
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

**Errors**:
- `400 Bad Request`: "All fields are required"
- `400 Bad Request`: "Email already in use!"
- `500 Internal Server Error`: An unexpected error occurred on the server.

#### `POST /auth/login`
Logs in an existing user and returns a JWT.

**Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "strongpassword123"
}
```

**Response**:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "STUDENT",
    "mentorId": null,
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

**Errors**:
- `400 Bad Request`: "Email and password are required"
- `400 Bad Request`: "Incorrect Password"
- `404 Not Found`: "User not found, Create account to continue"
- `500 Internal Server Error`: An unexpected error occurred on the server.

---

#### **User (`/user`)**

#### `GET /user`
Retrieves the profile of the currently authenticated user. Requires `Authorization: Bearer <token>` header.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "STUDENT",
    "mentorId": null,
    "createdAt": "2024-05-20T10:00:00.000Z",
    "updatedAt": "2024-05-20T10:00:00.000Z"
  }
}
```

**Errors**:
- `401 Unauthorized`: No token provided or token is invalid.
- `404 Not Found`: "User not found"
- `500 Internal Server Error`: An unexpected error occurred on the server.

---

#### **Mentors (`/mentors`)**

#### `POST /mentors/createProfile`
Creates a mentor profile for the authenticated user. This upgrades the user's role to `MENTOR`. Requires `Authorization` header.

**Request**:
```json
{
  "expertise": ["JavaScript", "Node.js", "React"],
  "bio": "Experienced full-stack developer specializing in the MERN stack."
}
```

**Response**:
```json
{
  "success": true,
  "mentor": {
    "id": "m-clx...",
    "userId": "u-clx...",
    "expertise": ["JavaScript", "Node.js", "React"],
    "bio": "Experienced full-stack developer specializing in the MERN stack.",
    "rating": 0,
    "createdAt": "2024-05-20T11:00:00.000Z",
    "updatedAt": "2024-05-20T11:00:00.000Z"
  }
}
```

**Errors**:
- `400 Bad Request`: "All inputs must be filled"
- `401 Unauthorized`: Invalid or missing token.
- `500 Internal Server Error`: "Error creating mentor profile"

#### `GET /mentors`
Retrieves a list of all mentors. Can be filtered by skills. Requires `Authorization` header.

**Request**:
No payload required. Optional query parameter: `/mentors?skills=JavaScript`

**Response**:
```json
{
  "success": true,
  "mentors": [
    {
      "id": "m-clx...",
      "userId": "u-clx...",
      "expertise": ["JavaScript", "Node.js", "React"],
      "bio": "Experienced full-stack developer...",
      "rating": 4.5,
      "createdAt": "2024-05-20T11:00:00.000Z",
      "updatedAt": "2024-05-20T11:00:00.000Z"
    }
  ]
}
```

**Errors**:
- `401 Unauthorized`: Invalid or missing token.
- `404 Not Found`: "Mentors with desired Skills does not exist"
- `500 Internal Server Error`: "Error fetching mentors"

#### `GET /mentors/:id`
Retrieves a specific mentor's profile by their ID. Requires `Authorization` header.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "profile": {
    "id": "m-clx...",
    "userId": "u-clx...",
    "expertise": ["JavaScript", "Node.js", "React"],
    "bio": "Experienced full-stack developer...",
    "rating": 4.5,
    "createdAt": "2024-05-20T11:00:00.000Z",
    "updatedAt": "2024-05-20T11:00:00.000Z",
    "user": {
      "id": "u-clx...",
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
  }
}
```

**Errors**:
- `401 Unauthorized`: Invalid or missing token.
- `404 Not Found`: "Profile not found"
- `500 Internal Server Error`: An unexpected error occurred on the server.

#### `PATCH /mentors/:id`
Updates a mentor's profile. The authenticated user must be the owner of the mentor profile. Requires `Authorization` header.

**Request**:
```json
{
  "expertise": ["JavaScript", "Node.js", "React", "GraphQL"],
  "bio": "Updated bio: Now also working with GraphQL."
}
```

**Response**:
```json
{
  "success": true,
  "updatedMentor": {
    "id": "m-clx...",
    "userId": "u-clx...",
    "expertise": ["JavaScript", "Node.js", "React", "GraphQL"],
    "bio": "Updated bio: Now also working with GraphQL.",
    "rating": 4.5,
    "createdAt": "2024-05-20T11:00:00.000Z",
    "updatedAt": "2024-05-20T12:00:00.000Z"
  }
}
```

**Errors**:
- `401 Unauthorized`: Invalid or missing token.
- `403 Forbidden`: "You are unable to make the action"
- `404 Not Found`: "Mentor profile not found"
- `500 Internal Server Error`: "Error updating mentor profile"

---

#### **Sessions (`/sessions`)**

#### `POST /sessions`
Creates a new mentorship session. Only users with the `MENTOR` role can create sessions. Requires `Authorization` header.

**Request**:
```json
{
  "title": "Intro to Node.js",
  "description": "A beginner session covering the basics of Node.js.",
  "date": "2024-06-01",
  "time": "14:00 UTC",
  "duration": "60 minutes"
}
```

**Response**:
```json
{
  "success": true,
  "session": {
    "id": "s-clx...",
    "title": "Intro to Node.js",
    "description": "A beginner session covering the basics of Node.js.",
    "date": "2024-06-01",
    "time": "14:00 UTC",
    "duration": "60 minutes",
    "mentorId": "m-clx...",
    "studentId": "eaaf3f26-fe95-47a0-acef-05054a93ee69",
    "rating": 0,
    "status": "PENDING",
    "createdAt": "2024-05-20T13:00:00.000Z"
  }
}
```

**Errors**:
- `400 Bad Request`: "All fields are required"
- `401 Unauthorized`: Invalid or missing token.
- `403 Forbidden`: "Only mentors can create sessions"
- `500 Internal Server Error`: "Error creating session"

#### `GET /sessions`
Retrieves all available mentorship sessions. Requires `Authorization` header.

**Request**:
No payload required.

**Response**:
```json
{
  "success": true,
  "session": [
    {
      "id": "s-clx...",
      "title": "Intro to Node.js",
      "time": "14:00 UTC",
      "mentor": { ... },
      "duration": "60 minutes",
      "rating": 0,
      "student": { ... }
    }
  ]
}
```

**Errors**:
- `401 Unauthorized`: Invalid or missing token.
- `500 Internal Server Error`: "Error fetching sessions"

#### `PATCH /sessions/:id`
Rates a completed session. Requires `Authorization` header.

**Request**:
```json
{
  "rating": 5
}
```

**Response**:
```json
{
  "success": true,
  "updatedSession": {
    "id": "s-clx...",
    "title": "Intro to Node.js",
    "rating": 5,
    "status": "COMPLETED",
    "...": "..."
  }
}
```

**Errors**:
- `400 Bad Request`: "ID of session is required"
- `400 Bad Request`: "Rating field is important"
- `401 Unauthorized`: Invalid or missing token.
- `404 Not Found`: "Session not found"
- `422 Unprocessable Entity`: "Rating must be a number"
- `500 Internal Server Error`: "Error rating session"