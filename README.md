# Kifayti Health — Marketing Website

Marketing website for Kifayti Health with a public-facing React frontend and a Node/Express backend powering:

- Blog listing + blog detail pages
- Admin dashboard (JWT auth) for managing blog posts and viewing contact messages
- Contact form that stores submissions in MongoDB and attempts to send an email notification
- Optional blog image upload support (served from `/uploads`)

This repo is a monorepo with two apps:

- `client/` — React + Vite + Tailwind
- `server/` — Express + MongoDB (Mongoose)

---

## Tech Stack

**Client**

- React 18 + React Router
- Vite
- Tailwind CSS
- GSAP / Framer Motion (animations)
- Markdown rendering for blog content (`react-markdown`, `remark-gfm`, `rehype-sanitize`)

**Server**

- Node.js + Express
- MongoDB + Mongoose
- Nodemailer (SMTP email)
- Multer (image uploads)
- JWT (admin-only endpoints)

---

## Project Structure

```
.
├─ client/               # React frontend (Vite)
└─ server/               # Express API + MongoDB
```

Key routes and entrypoints:

- Client entry: `client/src/main.jsx`
- Client routes: `client/src/App.jsx`
- Server entry: `server/server.js`
- Server routes: `server/routes/*`

---

## Prerequisites

- Node.js 18+ recommended
- MongoDB connection string (MongoDB Atlas or local)

---

## Getting Started (Local Development)

### 1) Install dependencies

In one terminal:

```bash
cd server
npm install
```

In a second terminal:

```bash
cd client
npm install
```

### 2) Configure environment variables

Create a `.env` file for the server in `server/.env` (start from `server/.env.example`):

```ini
PORT=5000
MONGO_URI=mongodb+srv://.../...

# Admin
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password

# JWT
JWT_SECRET=your_long_random_secret

# Email (Nodemailer / Gmail SMTP)
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CONTACT_EMAIL=where_to_receive_contact_emails@example.com
```

Create a `.env` file for the client in `client/.env` (start from `client/.env.example`):

```ini
# Server base URL (no trailing slash). Examples:
# - http://localhost:5000
# - https://your-api.example.com
VITE_API_URL=http://localhost:5000
```

Notes:

- The Admin Dashboard reads `VITE_API_URL` and builds requests to `${VITE_API_URL}/api/...`.
- All client API calls should be routed through `VITE_API_URL` so deployments can point to the correct API host.

### 3) Run the apps

Start the server:

```bash
cd server
npm run dev
```

Start the client:

```bash
cd client
npm run dev
```

Defaults:

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

---

## Scripts

### Client (`client/package.json`)

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run host` — start Vite dev server accessible on your network

### Server (`server/package.json`)

- `npm run dev` — start with nodemon
- `npm start` — start with node

---

## API Reference

Base URL (local): `http://localhost:5000`

### Health / Static

- `GET /uploads/<filename>` — serves uploaded images

### Blogs

- `GET /api/blogs` — list all blog posts (public)
- `GET /api/blogs/:id` — get a single blog post (public)

Admin-protected (JWT required):

- `POST /api/blogs` — create blog post (multipart form-data)
  - fields: `title`, `content` (markdown), `author`, `category`
  - image: either `image` (file upload) OR `imageUrl` (string URL)
- `PUT /api/blogs/:id` — update blog post (multipart form-data; same fields as create)
- `DELETE /api/blogs/:id` — delete blog post

Uploads:

- Allowed types: jpeg/jpg/png/gif
- Size limit: 5MB

### Contact

- `POST /api/contact/submit` — submit contact form (public)
  - body (JSON): `firstName`, `lastName`, `email`, `phone` (10 digits), `message`
  - behavior: saves to MongoDB, then attempts to send an email notification

Admin-protected (JWT required):

- `GET /api/contact` — list recent contact messages
- `GET /api/contact/:id` — get a single contact message
- `PATCH /api/contact/:id/status` — update status (`new` | `in-progress` | `completed`)

### Admin

- `POST /api/admin/login` — returns a JWT
  - body (JSON): `username`, `password`
- `GET /api/admin/verify` — verifies a JWT

#### Bearer token header

Admin endpoints require an `Authorization` header:

```text
Authorization: Bearer <jwt>
```

Example:

```bash
TOKEN=$(curl -s \
  -H "Content-Type: application/json" \
  -d '{"username":"'"$ADMIN_USERNAME"'","password":"'"$ADMIN_PASSWORD"'"}' \
  http://localhost:5000/api/admin/login | node -p "JSON.parse(require('fs').readFileSync(0,'utf8')).token")

curl -i \
  -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/admin/verify
```

---


## License

Proprietary software owned by Kifayti Health. All rights reserved.

---

**Built by the Kifayti Health Development Team**

*Empowering kidney care through innovative technology solutions*
