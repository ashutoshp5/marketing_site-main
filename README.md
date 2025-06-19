# Marketing Site Project

Welcome to the **Marketing Site Project**! This repository contains a comprehensive solution for a marketing website, complete with frontend, backend, and an administrative interface. The project leverages modern technologies to deliver a seamless and efficient user experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Cloning the Repository](#cloning-the-repository)
  - [Installing Dependencies](#installing-dependencies)
- [Environment Setup](#environment-setup)
  - [Backend Environment Variables](#backend-environment-variables)
  - [Admin Frontend Environment Variables](#admin-frontend-environment-variables)
- [Running the Project](#running-the-project)
  - [Starting the Backend](#starting-the-backend)
  - [Starting the Marketing Frontend](#starting-the-marketing-frontend)
  - [Starting the Admin Frontend](#starting-the-admin-frontend)
- [Usage](#usage)
  - [Marketing Site](#marketing-site)
  - [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Project Overview

The **Marketing Site Project** is divided into three main components:

1. **Marketing Site Frontend**: Built with **React**, **Vite**, and **Tailwind CSS**, this is the public-facing website that showcases your marketing content.

2. **Backend**: Handles contact form submissions and blog management. It utilizes **Node.js**, **Express**, and **MongoDB Atlas** for data storage.

3. **Admin Frontend**: A separate administrative interface for managing blog posts. It is built with **React** and uses **Basic Authentication** for security.

This modular approach ensures a clear separation of concerns, making the project scalable and maintainable.

## Technologies Used

- **Frontend (Marketing Site & Admin Dashboard)**
  - React
  - Vite
  - Tailwind CSS
  - React Router DOM
  - Framer Motion
  - Axios
  - React Toastify

- **Backend**
  - Node.js
  - Express.js
  - MongoDB Atlas
  - Mongoose
  - dotenv
  - nodemon
  - cors

## Project Structure (ignore this structure its basic overview after git clone see the structure)

```
marketing-site-project/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── marketing-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   |    
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── admin-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── .gitignore
```

---

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**
- **Git**

### Cloning the Repository

```bash
git clone <link>
cd marketing-site-project
```

### Installing Dependencies

The project consists of three separate folders: `backend`, `marketing-frontend`, and `admin-frontend`. Each requires its own set of dependencies.

1. **Backend**

   ```bash
   cd backend
   npm install
   ```

2. **Marketing Frontend**

   ```bash
   cd ../marketing-frontend
   npm install
   ```

3. **Admin Frontend**

   ```bash
   cd ../admin-frontend
   npm install
   ```

---

## Environment Setup

### Backend Environment Variables

Create a `.env` file inside the `backend` directory with the following parameters:

```env
# backend/.env

CONTACT_EMAIL=
EMAIL_USERNAME=
EMAIL_PASSWORD=
PORT=5000
MONGO_URI=

ADMIN_USERNAME=
ADMIN_PASSWORD=
```

**Important:**

- **Never commit `.env` files to version control.** Ensure `.env` is added to `.gitignore`.
  
  ```gitignore
  # backend/.gitignore

  node_modules/
  .env
  ```

### Admin Frontend Environment Variables

Create a `.env` file inside the `admin-frontend` directory with the following parameter:

```env
# admin-frontend/.env

VITE_API_BASE_URL=http://localhost:5000/api
```

**Note:** Vite requires environment variables to be prefixed with `VITE_` to expose them to the frontend.

---

## Running the Project

After setting up environment variables and installing dependencies, you can start the backend and both frontends.

### Starting the Backend

1. **Navigate to the Backend Directory:**

   ```bash
   cd backend
   ```

2. **Start the Backend Server:**

   ```bash
   npm run dev
   ```

   **Note:** This command typically uses `nodemon` to automatically restart the server on code changes.

3. **Backend Access:**

   - **API Base URL:** `http://localhost:5000/api`

### Starting the Marketing Frontend

1. **Open a New Terminal Tab or Window.**

2. **Navigate to the Marketing Frontend Directory:**

   ```bash
   cd marketing-frontend
   ```

3. **Start the Frontend Server:**

   ```bash
   npm run dev
   ```

4. **Frontend Access:**

   - **URL:** `http://localhost:5174` (default Vite port)

### Starting the Admin Frontend

1. **Open Another Terminal Tab or Window.**

2. **Navigate to the Admin Frontend Directory:**

   ```bash
   cd admin-frontend
   ```

3. **Start the Admin Frontend Server:**

   ```bash
   npm run dev
   ```

4. **Admin Frontend Access:**

   - **URL:** `http://localhost:5174` (Ensure it uses a different port if necessary)

---

## Usage

### Marketing Site

- **Homepage:** Showcases your marketing content.
- **Contact Form:** Allows users to send inquiries. Submissions are handled by the backend and sent to the specified contact email.
- **Blog Section:** Displays a list of blog posts fetched from the backend.

### Admin Dashboard

- **Login:** Access the admin panel using the credentials specified in the backend `.env` file.
  - **Username:** `admin`
  - **Password:** `securepassword123`
- **Manage Blogs:** Create, edit, and delete blog posts.
- **Authentication:** Currently uses Basic Authentication. For enhanced security, consider implementing JWT-based authentication as outlined in the [JWT Implementation Guide](#jwt-implementation).

---

## Deployment

To deploy your application, consider the following steps:

1. **Backend Deployment:**
   - Use platforms like **Heroku**, **DigitalOcean**, or **AWS**.
   - Ensure environment variables are securely set on the hosting platform.

2. **Frontend Deployment:**
   - Use platforms like **Vercel**, **Netlify**, or **AWS Amplify**.
   - Ensure the frontend is configured to communicate with the deployed backend API.

3. **Database:**
   - **MongoDB Atlas** is already set up. Ensure your production database URI is correctly configured in the backend `.env` file.

4. **Environment Variables:**
   - Securely manage and set environment variables on your hosting platforms.

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository.**
2. **Create a New Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

3. **Commit Your Changes:**

   ```bash
   git commit -m "Add some feature"
   ```

4. **Push to the Branch:**

   ```bash
   git push origin feature/YourFeatureName
   ```

5. **Open a Pull Request.**

**Please ensure that your code follows the project's coding standards and includes appropriate documentation and tests.**

---



## Contact

For any inquiries or support, please contact:

- **Email:** supersaiyanaryan@gmail.com
- **GitHub:** [Aryanzs](https://github.com/Aryanzs)

---

**Happy Coding and Managing Your Marketing Site! 🚀**"# marketing_site-main" 
