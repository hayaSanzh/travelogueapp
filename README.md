# travelogueapp

# Travel Experience Sharing Platform

## Project Overview
This project is a full-stack web application designed for travelers to share their experiences. The backend is built with **Node.js (Express)** and the frontend is powered by **React**. Users can create, view, and manage travel stories while administrators maintain platform integrity.

## Features
- **User Authentication** (Registration & Login)
- **JWT-Based Authentication**
- **Admin Controls** (User Management & Statistics)
- **Travel Experience Management** (CRUD Operations for User Stories)
- **Protected Routes with Middleware**
- **React-based Client-Side UI**

---
## Setup Instructions

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (Latest LTS version recommended)
- **MongoDB** (Local or cloud-based, e.g., MongoDB Atlas)
- **NPM** (or Yarn as a package manager)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hayaSanzh/travelogueapp.git
   cd your-repository
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a **.env** file in the root directory and configure the following environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup (React Client)
1. Navigate to the **client** folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

---
## API Documentation
### Authentication Routes
**Base URL:** `/api/auth`

| Method | Endpoint      | Description                  | Protected |
|--------|-------------|------------------------------|------------|
| POST   | `/register`  | Register a new user          | No         |
| POST   | `/login`     | Login and receive a token    | No         |
| GET    | `/verify`    | Verify user authentication   | Yes        |

### User Routes
**Base URL:** `/api/users`

| Method | Endpoint       | Description                     | Protected |
|--------|---------------|---------------------------------|------------|
| GET    | `/profile`     | Get logged-in user profile      | Yes        |
| PUT    | `/profile`     | Update user profile            | Yes        |

### Entry Routes
**Base URL:** `/api/entries`

| Method | Endpoint       | Description                     | Protected |
|--------|---------------|---------------------------------|------------|
| POST   | `/`           | Create a new entry             | Yes        |
| GET    | `/`           | Get all entries                | Yes        |
| GET    | `/user`       | Get entries by logged-in user  | Yes        |
| GET    | `/:id`        | Get a single entry by ID       | Yes        |
| PUT    | `/:id`        | Update an entry by ID          | Yes        |
| DELETE | `/:id`        | Delete an entry by ID          | Yes        |

### Admin Routes
**Base URL:** `/api/admin`

| Method | Endpoint       | Description                     | Protected |
|--------|---------------|---------------------------------|------------|
| GET    | `/verify`      | Verify if user is an admin      | Yes (Admin) |
| GET    | `/users`       | Get all users                  | Yes (Admin) |
| DELETE | `/users/:id`   | Delete a user by ID            | Yes (Admin) |
| GET    | `/stats`       | Get platform statistics        | Yes (Admin) |
