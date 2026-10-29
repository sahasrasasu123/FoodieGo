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
