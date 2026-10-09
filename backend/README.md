Student Course Management - Backend

Overview



REST API backend for the Student Course Management project, built using Node.js and Express.js.



Features

Retrieve all courses

Retrieve a course by ID

Add a new course

Update an existing course

Delete a course

Course input validation

Health check endpoint

Swagger API documentation

Error handling

Technologies

Node.js

Express.js

Swagger

Installation



Open a terminal in the backend directory and run:



npm install

Run the Server

npm start



The API runs at http://localhost:5000.



API Documentation



Open http://localhost:5000/api-docs after starting the server.



API Endpoints

Method	Endpoint	Purpose

GET	/api/courses	Get all courses

GET	/api/courses/:id	Get a course by ID

POST	/api/courses	Create a course

PUT	/api/courses/:id	Update a course

DELETE	/api/courses/:id	Delete a course

GET	/api/health	Check server status



Note: Course data is currently stored in memory and resets when the server restarts.

