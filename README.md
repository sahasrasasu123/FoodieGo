# FoodieGo
FoodieGo backend API project
# FoodieGo

FoodieGo is a backend API project for a food ordering application, built with Node.js and Express.js.

## Features

- REST API backend using Express.js
- User authentication routes
- Food management routes
- Order management routes
- JSON request and response handling
- CORS support
- Health-check endpoint

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Git and GitHub

## Project Structure

```text
FoodieGo/
├── src/
│   ├── app.js
│   ├── controllers/
│   ├── models/
│   └── routes/
├── index.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sahasrasasu123/FoodieGo.git
   ```

2. Navigate to the project directory:

   ```bash
   cd FoodieGo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

The server uses port `5000` by default unless configured otherwise.

## Health Check

If the health-check route is configured, open the following URL after starting the server:

`http://localhost:5000/health`

Expected response:

```json
{
  "success": true,
  "message": "FoodieGo API is running"
}
```

## Learning Outcomes

- Learned how to structure a Node.js backend project.
- Practiced creating an Express.js application.
- Learned how to organize routes, controllers, and models.
- Practiced using Git and GitHub for version control.
- Learned how to document and test a backend API.

## Questions

1. How can authentication and authorization be implemented securely in a food ordering API?
2. How can error handling and input validation be improved in an Express.js backend?

## Author

FoodieGo Backend Project
# FoodieGo Backend — Assignment 2

## Project Overview

FoodieGo is a Node.js and Express backend application connected to MongoDB using Mongoose. This assignment implements Restaurant CRUD APIs.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Postman (API testing)

## Setup Instructions

1. Clone or download the FoodieGo repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root.

4. Add your MongoDB connection string:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. Start the server:

   ```bash
   npm start
   ```

The server connects to MongoDB before starting.

## Restaurant API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/restaurants` | Create a restaurant |
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/:id` | Get a restaurant by ID |
| PATCH | `/api/restaurants/:id` | Update a restaurant |
| DELETE | `/api/restaurants/:id` | Delete a restaurant |

## Restaurant Fields

- `name`: Required restaurant name
- `description`: Optional description
- `cuisineTypes`: Array of cuisine names
- `address`: Required address
- `phone`: Optional phone number stored as a string
- `isActive`: Boolean that defaults to true
- `createdAt` and `updatedAt`: Automatically managed timestamps

## Error Handling

- `200 OK`: Request completed successfully.
- `201 Created`: Restaurant created successfully.
- `400 Bad Request`: Invalid input or malformed restaurant ID.
- `404 Not Found`: Restaurant does not exist.
- `500 Internal Server Error`: Unexpected server error.

## Security

The `.env` file contains private configuration and must not be committed to GitHub. Use `.env.example` as a template without real credentials.
1. What is CRUD?

CRUD means Create, Read, Update and Delete. In FoodieGo, these operations create restaurant records, retrieve them, modify their information and remove them.

2. What is the difference between a database, collection and document?

A database contains collections. A collection groups related records, and a document is one individual record stored in MongoDB.

3. What are Mongoose schemas and models?

A schema defines a document's fields, types and validation rules. A model uses the schema to create, retrieve, update and delete documents in MongoDB.

4. What is the difference between a route, controller and model?
- Route: Defines the HTTP method and endpoint.
- Controller: Handles the request and response.
- Model: Defines the data structure and interacts with MongoDB.
5. What do HTTP status codes mean?

200 means success, 201 means a resource was created, 400 means the request is invalid, 404 means the resource was not found, and 500 means an unexpected server error occurred.

6. Why validate incoming data?

Validation prevents missing, invalid or incorrectly typed information from being saved and helps return clear error messages.

7. Why use environment variables?

They keep configuration and private credentials outside the source code, reducing the risk of exposing secrets.

8. What should happen if MongoDB is unavailable?

The application should report the connection failure safely and avoid starting the API server as though the database were ready. Database credentials should never be logged or returned to clients.
