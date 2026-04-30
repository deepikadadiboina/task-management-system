# Task Management System

A full-stack Task Management System built using React.js, Node.js, Express.js, and MongoDB.

## Features

- Create tasks
- View all tasks
- Edit tasks
- Delete tasks
- Filter tasks by status
- Filter tasks by priority
- Form validation
- Task card component
- API integration between frontend and backend

## Tech Stack

- Frontend: React.js, Vite
- Backend: Node.js, Express.js
- Database: MongoDB

## Project Structure

```txt
TaskManagement/
  backend/
    config/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      App.jsx
      main.jsx
  README.md
```

## Setup Instructions

### Backend

Install backend dependencies from the project root:

```bash
npm install
```

Make sure MongoDB is running locally.

Start the backend server:

```bash
node backend/server.js
```

Backend runs on:

```txt
http://localhost:5000
```

### Frontend

Go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm.cmd run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## API Documentation

### Create Task

```txt
POST /api/tasks
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish task management project",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-05-01"
}
```

### Get All Tasks

```txt
GET /api/tasks
```

### Get Task By ID

```txt
GET /api/tasks/:id
```

### Update Task

```txt
PUT /api/tasks/:id
```

Request body example:

```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "status": "completed",
  "priority": "medium",
  "dueDate": "2026-05-02"
}
```

### Delete Task

```txt
DELETE /api/tasks/:id
```

## Task Fields

- Title
- Description
- Status
- Priority
- Due Date
- Created At



