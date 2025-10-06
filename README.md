# 📝 Blog API - Node.js Backend

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

A **robust and secure RESTful API** for a blogging platform built with **Node.js**, **Express**, and **MySQL**. It supports full CRUD operations for blogs and comments, image uploads, JWT authentication, and comprehensive error handling.

---

## ✨ Features

- 🚀 **RESTful API Design** – Clean, predictable endpoints
- 📝 **Blog Management** – Create, read, update, delete blog posts
- 💬 **Comment System** – Comment functionality with reply support
- 🖼️ **Image Uploads** – Hero banner support with Multer
- 🔐 **JWT Authentication** – Secure routes and token-based auth
- 🛡️ **Security** – CORS, helmet, and input validation
- 📊 **Logging** – Console logs for debugging and tracking
- 🗃️ **MySQL Database** – Indexed and relational schema
- 🔄 **Error Handling** – Graceful error messages & status responses

---

## 🧱 Tech Stack

| Technology | Description |
|-------------|-------------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Fast, unopinionated web framework |
| **MySQL** | Relational database for blogs & comments |
| **JWT** | Authentication mechanism |
| **Multer** | Middleware for file uploads |
| **dotenv** | Environment configuration |

---

## 🏗️ Project Structure

```
blog-api/
├── 📁 src/
│   ├── 📁 api/
│   │   ├── 📁 blogs/
│   │   │   ├── 📄 blog.controller.js
│   │   │   ├── 📄 blog.model.js
│   │   │   ├── 📄 blog.routes.js
│   │   │   └── 📄 index.js
│   │   ├── 📁 comments/
│   │   │   ├── 📄 comment.controller.js
│   │   │   ├── 📄 comment.model.js
│   │   │   ├── 📄 comment.routes.js
│   │   │   └── 📄 index.js
│   │   └── 📄 routes.js
│   ├── 📁 config/
│   │   ├── 📄 database.js
│   │   └── 📄 upload.js
│   ├── 📁 middleware/
│   │   ├── 📄 auth.js
│   │   └── 📄 errorHandler.js
│   └── 📄 app.js
├── 📁 uploads/
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
└── 📄 server.js
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### Installation

```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=blog_db

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Database Setup

```sql
CREATE DATABASE blog_db;
```
> The API will automatically create the required tables (`development_blogs`, `blog_comments`) on first run.

### Start the Server

```bash
# Development mode (auto reload)
npm run dev

# Production mode
npm start
```

---

## 📘 API Documentation

### Base URL
```
http://localhost:5000/api
```

### 🔑 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|---------|-----------|--------------|----------------|
| POST | `/auth/register` | Register new user | ❌ |
| POST | `/auth/login` | User login | ❌ |
| GET | `/auth/me` | Get current user | ✅ |

### 📝 Blog Endpoints

| Method | Endpoint | Description | Auth Required |
|---------|-----------|--------------|----------------|
| GET | `/blogs` | Get all blogs | ❌ |
| GET | `/blogs/published` | Get published blogs | ❌ |
| GET | `/blogs/:id` | Get blog by ID | ❌ |
| POST | `/blogs` | Create blog | ✅ |
| PUT | `/blogs/:id` | Update blog | ✅ |
| PATCH | `/blogs/:id/publish` | Toggle publish status | ✅ |
| DELETE | `/blogs/:id` | Delete blog | ✅ |

### 💬 Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|---------|-----------|--------------|----------------|
| GET | `/comments/blog/:blogId` | Get comments for blog | ❌ |
| GET | `/comments/count/:blogId` | Get comment count | ❌ |
| POST | `/comments` | Add comment | ✅ |
| DELETE | `/comments/:id` | Delete comment | ✅ |

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|-----------|-------------|----------|
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | — |
| `DB_NAME` | Database name | `blog_db` |
| `JWT_SECRET` | JWT secret key | — |
| `JWT_EXPIRES_IN` | JWT expiry | `7d` |
| `PORT` | Server port | `5000` |

### File Upload Configuration

- Supported formats: **JPEG, JPG, PNG, GIF, WEBP**
- Maximum file size: **5MB**
- Upload directory: `/uploads`

---

## 🧪 Development

### Available Scripts

```bash
npm start       # Run production server
npm run dev     # Run development server (nodemon)
npm test        # Run test suite (if available)
```

---

## 🤝 Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 🪪 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Your Name**  
[GitHub](https://github.com/rahul-hytrox)  
[Email](mailto:droiddev04.com)
[Contact](https://kronextech.in)

---

⭐ If you like this project, consider giving it a **star** on GitHub!

