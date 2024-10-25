# SyncUp - A Slack Clone

SyncUp is a real-time messaging application built with the MERN stack (MongoDB, Express.js, React, Node.js). It replicates the core functionalities of Slack, allowing users to create channels, send messages, and collaborate seamlessly. SyncUp is designed to offer a responsive UI and provides support for team collaboration with real-time messaging capabilities.

[SyncUp](https://github.com/DOodle25/SyncUP/blob/main/SyncUP.mp4)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)

## Features
- **Real-time Messaging**: Instant messaging in channels and direct messages.
- **Channel Management**: Create, edit, and delete channels for organized communication.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Works across devices with a responsive UI.
- **User Profiles**: Each user has a profile with relevant details.

## Tech Stack
- **Frontend**: React, Redux, MUI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose

## Getting Started

To run SyncUp on your local machine, follow the steps below:

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/SyncUp.git
   cd SyncUp/SyncUpBackend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following environment variables:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/syncup?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../SyncUpFrontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the frontend application:
   ```bash
   npm run dev
   ```

The frontend application will run on `http://localhost:3000`.

### Running the Project
To start both the backend and frontend, navigate to each respective folder (`SyncUpFrontend` and `SyncUpBackend`) and run the `npm run dev` command.

- **Backend**: `cd SyncUpBackend` -> `npm run dev`
- **Frontend**: `cd SyncUpFrontend` -> `npm run dev`

## Project Structure

    SyncUp
    ├── SyncUpBackend           # Backend (Node.js + Express + MongoDB)
    │   ├── config              # Configuration files (e.g., db.js)
    │   ├── controllers         # Route controllers for each API endpoint
    │   ├── models              # Mongoose schemas and models
    │   ├── routes              # Express route definitions
    │   └── server.js           # Server entry point
    │
    ├── SyncUpFrontend          # Frontend (React + Redux + MUI)
    │   ├── public              # Public assets
    │   ├── src
    │   │   ├── components      # React components
    │   │   ├── pages           # Page components
    │   │   └── App.js          # Main app component
    │   └── index.js            # React entry point

## Contributing
Feel free to contribute by opening issues or submitting pull requests.

## License
This project is licensed under the MIT License.
```

This template explains the project structure, installation steps, and provides environment setup instructions, covering the project needs comprehensively for deployment.
