
# Portfolio Web Application

A fullstack portfolio web application built with React, MongoDB, and Express.

## Features

- Dynamic and interactive user interface with animations
- Responsive design for all devices
- Dark/light theme toggle
- Projects showcase with filtering
- Blog section with categories and tags
- Contact form with server-side validation
- MongoDB integration for data persistence

## Tech Stack

### Frontend
- React
- TailwindCSS
- Framer Motion for animations
- React Router for navigation
- React Query for data fetching
- Zod for form validation
- Shadcn UI components

### Backend
- Express.js server
- MongoDB with Mongoose
- RESTful API architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your MongoDB connection string
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

### Running the application

1. Start the backend server:
   ```bash
   node src/server/index.js
   ```

2. In a separate terminal, start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Deployment

This application can be deployed on various platforms:

- Frontend: Vercel, Netlify, or GitHub Pages
- Backend: Heroku, Render, or Railway
- Database: MongoDB Atlas

## License

This project is licensed under the MIT License - see the LICENSE file for details.
