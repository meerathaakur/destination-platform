# Destination Recommendation Platform

## Introduction
We are there to show you where you have to spend your vacation. It would be comfortable and pocket friendly. So let's explore us and find some better.

## Project Type
Fullstack

## Deplolyed App
Frontend: https://deployed-site.whatever
Backend: https://deployed-site.whatever
Database: https://deployed-site.whatever

## Directory Structure
destination-platform/
├─ client/
├─ server/

## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features
List out the key features of your application.

- Feature 1 -> It is user friendly. Save time for searching huge things to go. 
- Feature 2 -> It has user, admin, super-admin credential which make it more real.
- Feature 3 -> Also I'm working on it's chatting part where user can make some connections
- Feature 4 -> Docker part it pending... (work in progress)

## design decisions or assumptions
- Client-Server Architecture
- Modular Design
- JWT-based Authentication
- Role-Based Access Control (RBAC)
- CORS Protection
- MongoDB + Mongoose

## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE/FS projects, guide the reviewer how to check mongodb schema etc.

client-side
```bash
npm install react-router-dom axios leaflet react-leaflet reack-hook-form zustand immer recharts
npm install @mui/material @mui/icons-material @emotion/styled date-fns uuid lodash
npm start
```

server-side
```bash
npm init -y
npm install express mongoose cors multer morgan helmet bcrypt bcryptjs jsonwebtoken path cookie-parser cloudinary path compression
npm install --save-dev nodemon dotenv
```

## Usage
Provide instructions and examples on how to use your project.
Let's find some mistakes and learn. If you collab with us you find mistakes and also got some basic fundamentals. You can clone repo and run in your local environment or go through the provided link

```bash
git clone https://github.com/meerathaakur/destination-platform.git
```

Include screenshots as necessary.
![alt text](<Screenshot 2025-03-24 031206-1.png>)
![alt text](<Screenshot 2025-03-24 031417-1.png>)
![alt text](<Screenshot 2025-03-24 031409-1.png>) 
![alt text](<Screenshot 2025-03-24 031335-1.png>) 
![alt text](<Screenshot 2025-03-24 031323-1.png>) 
![alt text](<Screenshot 2025-03-24 031258-1.png>) 
![alt text](<Screenshot 2025-03-24 031224-1.png>)

## Credentials
Provide user credentials for autheticated pages

login:{
    email: "",
    password: ""
}

first sign up with your credential then login

sign up:{
    name: "",
    email: "",
    phone: "",
    password: ""
}

## APIs Used
If your application relies on external APIs, document them and include any necessary links or references.
/login
/register
/survey
/recommendation
/forgot-password


## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.
GET / - test routes
POST /api/auth/register- create a new item
POST /api/auth/login- login user



## Technology Stack
List and provide a brief overview of the technologies used in the project.

- React + vite (frontend)
- tailwindcss
- Node.js
- Express.js
- MongoDB 
- Docker (Remaining)